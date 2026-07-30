import type { IdentityProvider } from '../core/provider.interfaace.js';
import type { ExternalProfile } from '../../users/user.types.js';
import ApiError from '../../../common/utils/api-error.js';

// Per spec:
const AUTH_URL = 'https://github.com/login/oauth/authorize';
const TOKEN_URL = 'https://github.com/login/oauth/access_token';
const USER_URL = 'https://api.github.com/user';
const EMAILS_URL = 'https://api.github.com/user/emails';

const DEFAULT_SCOPES = ['read:user', 'user:email'];

interface GitHubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

// Raw shape from GET /user. `email` is frequently null — see note below.
interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string | null;
  email: string | null;
}

// Raw shape from GET /user/emails — the actual source of truth for a
// verified email, since /user's email field is often withheld.
interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
}

export class GitHubProvider implements IdentityProvider {
  readonly name = 'github' as const;
  readonly displayName = 'GitHub';

  private get clientId(): string | undefined {
    return process.env.GITHUB_CLIENT_ID;
  }

  private get clientSecret(): string | undefined {
    return process.env.GITHUB_CLIENT_SECRET;
  }

  private get redirectUri(): string | undefined {
    return process.env.GITHUB_REDIRECT_URI;
  }

  isEnabled(): boolean {
    return Boolean(this.clientId && this.clientSecret && this.redirectUri);
  }

  /**
   * Builds the GitHub OAuth authorization URL the user is redirected to.
   */
  getAuthorizationUrl(params: { state: string; scopes?: string[] }): string {
    if (!this.isEnabled()) {
      throw ApiError.internal('GitHub provider is not configured (missing env vars)');
    }

    const url = new URL(AUTH_URL);
    url.searchParams.set('client_id', this.clientId!);
    url.searchParams.set('redirect_uri', this.redirectUri!);
    url.searchParams.set('scope', (params.scopes ?? DEFAULT_SCOPES).join(' '));
    url.searchParams.set('state', params.state);

    return url.toString();
  }

  /**
   * Exchanges an authorization code for tokens, fetches the user's
   * profile AND their email list (since /user's email is often withheld),
   * and maps the result into our normalized ExternalProfile shape.
   */
  async exchangeCodeForProfile(code: string): Promise<ExternalProfile> {
    if (!this.isEnabled()) {
      throw ApiError.internal('GitHub provider is not configured (missing env vars)');
    }

    // --- Step 1: token exchange ---
    const tokenRes = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json', // GitHub defaults to form-encoded responses without this
      },
      body: new URLSearchParams({
        code,
        client_id: this.clientId!,
        client_secret: this.clientSecret!,
        redirect_uri: this.redirectUri!,
      }),
    });

    if (!tokenRes.ok) {
      const errBody = await tokenRes.text();
      console.error('[GitHubProvider] token exchange failed:', errBody);
      throw ApiError.badRequest('GitHub token exchange failed');
    }

    const tokens = (await tokenRes.json()) as GitHubTokenResponse;

    if (!tokens.access_token) {
      // GitHub returns 200 OK with an error payload on bad codes, rather
      // than a non-2xx status — so we also guard on the token itself.
      // No upstream body to log here since we only checked a field on
      // an otherwise-successful response, not an error response.
      throw ApiError.badRequest('GitHub token exchange returned no access_token');
    }

    const authHeaders = {
      Authorization: `Bearer ${tokens.access_token}`,
      Accept: 'application/vnd.github+json',
    };

    // --- Step 2: profile ---
    const userRes = await fetch(USER_URL, { headers: authHeaders });
    if (!userRes.ok) {
      const errBody = await userRes.text();
      console.error('[GitHubProvider] user fetch failed:', errBody);
      throw ApiError.badRequest('GitHub user fetch failed');
    }
    const user = (await userRes.json()) as GitHubUser;

    // --- Step 3: emails (handle GitHub's often-null email gracefully) ---
    // /user.email is null unless the user made it public, so we prefer
    // the primary, verified entry from /user/emails. If that call fails,
    // fall back to whatever /user gave us, unverified, rather than
    // failing the whole login over a secondary lookup.
    let email: string | null = user.email;
    let emailVerified = false;

    const emailsRes = await fetch(EMAILS_URL, { headers: authHeaders });
    if (emailsRes.ok) {
      const emails = (await emailsRes.json()) as GitHubEmail[];
      const primary = emails.find((e) => e.primary) ?? emails[0];
      if (primary) {
        email = primary.email;
        emailVerified = primary.verified;
      }
    } else {
      // Silently keep the /user fallback above, but log server-side so
      // a persistent GitHub API issue doesn't go unnoticed.
      const errBody = await emailsRes.text();
      console.error('[GitHubProvider] emails fetch failed (using /user fallback):', errBody);
    }

    // --- Step 4: map GitHub's field names -> ExternalProfile's field names ---
    // GitHub's `id`         -> our `providerSubject` (cast to string; GitHub's is numeric)
    // GitHub's `name`/`login` -> our `displayName` (falls back to username if no display name set)
    // GitHub's `avatar_url` -> our `avatarUrl`
    return {
      provider: this.name,
      providerSubject: String(user.id),
      email,
      emailVerified,
      displayName: user.name ?? user.login,
      avatarUrl: user.avatar_url,
      rawProfile: user as unknown as Record<string, unknown>,
    };
  }
}