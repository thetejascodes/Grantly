const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface ApiEnvelope<T> {
  status: 'success' | 'error';
  message: string;
  data: T | null;
}

/**
 * Fetch wrapper for calling the Grantly backend. Always sends
 * `credentials: 'include'` so the session cookie travels cross-origin
 * (localhost:3000 -> localhost:8000) — without this, /session/me and
 * /clients would never see the logged-in user's session.
 */
async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  // 204 No Content has no body to parse (used by DELETE /clients/:id)
  if (res.status === 204) {
    return undefined as T;
  }

  const json = (await res.json()) as ApiEnvelope<T>;

  if (!res.ok || json.status === 'error') {
    throw new ApiError(res.status, json.message || 'Request failed');
  }

  return json.data as T;
}

export const api = {
  get: <T>(path: string) => apiFetch<T>(path, { method: 'GET' }),
  post: <T>(path: string, body?: unknown) =>
    apiFetch<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => apiFetch<T>(path, { method: 'DELETE' }),
};