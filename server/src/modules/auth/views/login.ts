interface LoginPageProvider {
  name: string;
  displayName: string;
}

interface RenderLoginPageParams {
  providers: LoginPageProvider[];
  interactionUid?: string | undefined; // explicit, since exactOptionalPropertyTypes distinguishes "absent" from "present but undefined"
}

// Minimal escaping since displayName/name currently only come from our
// own hardcoded provider classes, not user input — but escaping on
// principle in case that ever changes (e.g. an admin-configurable provider).
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Inline SVGs so the page has zero external requests and renders instantly,
// even offline. Kept simple/monochrome-friendly so they read well in both
// light and dark mode.
const PROVIDER_ICONS: Record<string, string> = {
  google: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.09C3.25 21.3 7.31 24 12 24z"/>
    <path fill="#FBBC05" d="M5.27 14.28A7.19 7.19 0 0 1 4.87 12c0-.79.14-1.56.4-2.28V6.63H1.28A11.96 11.96 0 0 0 0 12c0 1.93.46 3.76 1.28 5.37l3.99-3.09z"/>
    <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.28 6.63l3.99 3.09C6.22 6.88 8.87 4.77 12 4.77z"/>
  </svg>`,
  github: `<svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
      0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
      -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
      .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
      -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0
      1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82
      1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
      1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
  </svg>`,
};

export function renderLoginPage({ providers, interactionUid }: RenderLoginPageParams): string {
  const links = providers
    .map((p) => {
      const href = interactionUid
        ? `/auth/external/${encodeURIComponent(p.name)}?interaction_uid=${encodeURIComponent(interactionUid)}`
        : `/auth/external/${encodeURIComponent(p.name)}`;

      const icon = PROVIDER_ICONS[p.name] ?? '';
      const providerClass = `provider-btn provider-${escapeHtml(p.name)}`;

      return `<a class="${providerClass}" href="${href}">
        <span class="icon">${icon}</span>
        <span>Continue with ${escapeHtml(p.displayName)}</span>
      </a>`;
    })
    .join('\n    ');

  const noProvidersMessage = providers.length === 0
    ? '<p class="empty-msg">No login providers are currently available.</p>'
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Log in</title>
  <style>
    :root {
      --bg: #f3f4f6;
      --card-bg: #ffffff;
      --card-shadow: rgba(0, 0, 0, 0.08);
      --border: #e2e2e7;
      --text: #16181d;
      --text-muted: #6b7280;
      --btn-hover: #f7f7f8;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #0f1115;
        --card-bg: #1a1d24;
        --card-shadow: rgba(0, 0, 0, 0.4);
        --border: #2a2e37;
        --text: #f2f3f5;
        --text-muted: #9aa0aa;
        --btn-hover: #23272f;
      }
    }

    * { box-sizing: border-box; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: var(--bg);
      color: var(--text);
    }

    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      padding: 2.5rem 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 24px var(--card-shadow);
      width: 340px;
      text-align: center;
    }

    h1 {
      font-size: 1.4rem;
      margin: 0 0 0.4rem;
    }

    .subtitle {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin: 0 0 1.75rem;
    }

    .provider-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      margin: 0.6rem 0;
      padding: 0.7rem 1rem;
      border-radius: 8px;
      border: 1px solid var(--border);
      text-decoration: none;
      color: var(--text);
      font-size: 0.95rem;
      font-weight: 500;
      transition: background 0.15s ease, transform 0.05s ease;
    }

    .provider-btn:hover {
      background: var(--btn-hover);
    }

    .provider-btn:active {
      transform: scale(0.98);
    }

    .provider-btn .icon {
      display: inline-flex;
      align-items: center;
    }

    .provider-github svg {
      color: var(--text);
    }

    .empty-msg {
      color: var(--text-muted);
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Welcome back</h1>
    <p class="subtitle">Choose a provider to continue</p>
    ${links}
    ${noProvidersMessage}
  </div>
</body>
</html>`;
}