import { publicEnv } from '@/lib/env';

const apiBase = `${publicEnv.NEXT_PUBLIC_API_URL}/api`;

type RequestOptions = {
  method?: 'GET' | 'POST';
  token?: string;
  body?: unknown;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', token, body } = options;

  const response = await fetch(`${apiBase}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;
    try {
      const errorBody = (await response.json()) as { message?: string | string[] };
      if (Array.isArray(errorBody.message)) {
        message = errorBody.message.join(', ');
      } else if (typeof errorBody.message === 'string') {
        message = errorBody.message;
      }
    } catch {
      // Ignore parse failures and keep default status message.
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
}

