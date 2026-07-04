export type ApiClientConfig = {
  baseUrl: string;
  timeoutMs?: number;
};

const defaultConfig: ApiClientConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
  timeoutMs: 12_000
};

async function request<T>(
  path: string,
  options: RequestInit & { timeoutMs?: number } = {}
): Promise<T> {
  const url = `${defaultConfig.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), options.timeoutMs ?? defaultConfig.timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Request failed (${res.status}): ${text || res.statusText}`);
    }

    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  } finally {
    window.clearTimeout(timeout);
  }
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) })
};

