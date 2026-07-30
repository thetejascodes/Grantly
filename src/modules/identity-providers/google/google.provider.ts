import type { IdentityProvider } from '../core/provider.interfaace.js';
import type { ExternalProfile } from '../../users/user.types.js';
import ApiError from '../../../common/utils/api-error.js';

// Per spec:
const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const USERINFO_URL = 'https://openidconnect.googleapis.com/v1/userinfo';

const DEFAULT_SCOPES = ['openid', 'email', 'profile'];

interface GoogleTokenResponse {
  access_token: string;
  id_token: string;
  expires_in: number;
  token_type: string;
}

// Raw shape returned by Google's userinfo endpoint. Field names here are
// Google's own vocabulary (sub, name, picture) — NOT our ExternalProfile
// field names. The mapping happens explicitly below.
interface GoogleUserInfo {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
}

export class GoogleProvider implements IdentityProvider {
  readonly name = 'google' as const;
  readonly displayName = 'Google';

  private get clientId(): string | undefined {
    return process.env.GOOGLE_CLIENT_ID;
  }

  private get clientSecret(): string | undefined {
    return process.env.GOOGLE_CLIENT_SECRET;
  }

  private get redirectUri(): string | undefined {
    return process.env.GOOGLE_REDIRECT_URI;
  }

  isEnabled(): boolean {
    return Boolean(this.clientId && this.clientSecret && this.redirectUri);
  }

  /**
   * Builds the Google OAuth authorization URL the user is redirected to.
   */
  getAuthorizationUrl(params: { state: string; scopes?: string[] }): string {
    if (!this.isEnabled()) {
      throw ApiError.internal('Google provider is not configured (missing env vars)');
    }

    const url = new URL(AUTH_URL);
    url.searchParams.set('client_id', this.clientId!);
    url.searchParams.set('redirect_uri', this.redirectUri!);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', (params.scopes ?? DEFAULT_SCOPES).join(' '));
    url.searchParams.set('state', params.state);
    url.searchParams.set('access_type', 'offline');
    url.searchParams.set('prompt', 'consent');

    return url.toString();
  }

  /**
   * Exchanges an authorization code for tokens, fetches the user's
   * profile, and maps it into our normalized ExternalProfile shape.
   */
  async exchangeCodeForProfile(code: string): Promise<ExternalProfile> {
    if (!this.isEnabled()) {
      throw ApiError.internal('Google provider is not configured (missing env vars)');
    }

    // --- Step 1: token exchange ---
    const tokenRes = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: this.clientId!,
        client_secret: this.clientSecret!,
        redirect_uri: this.redirectUri!,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      // Full upstream error body is logged server-side only. Never
      // reflected back to the API caller — it's internal detail about
      // Google's response, not something an external caller should see.
      const errBody = await tokenRes.text();
      console.error('[GoogleProvider] token exchange failed:', errBody);
      throw ApiError.badRequest('Google token exchange failed');
    }

    const tokens = (await tokenRes.json()) as GoogleTokenResponse;

    // --- Step 2: userinfo ---
    const userRes = await fetch(USERINFO_URL, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!userRes.ok) {
      const errBody = await userRes.text();
      console.error('[GoogleProvider] userinfo fetch failed:', errBody);
      throw ApiError.badRequest('Google userinfo fetch failed');
    }

    const raw = (await userRes.json()) as GoogleUserInfo;

    // --- Step 3: map Google's field names -> ExternalProfile's field names ---
    // Google's `sub`      -> our `providerSubject`
    // Google's `name`     -> our `displayName`
    // Google's `picture`  -> our `avatarUrl`
    return {
      provider: this.name,
      providerSubject: raw.sub,
      email: raw.email ?? null,
      emailVerified: raw.email_verified ?? false,
      displayName: raw.name ?? null,
      avatarUrl: raw.picture ?? null,
      rawProfile: raw as unknown as Record<string, unknown>,
    };
  }
}