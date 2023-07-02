const baseUrl = `${process.env.NEXT_PUBLIC_URL}/api`;

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const doApiCall = (url: string, method: Method, data?: unknown) =>
  fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(data ? { body: JSON.stringify(data) } : null),
  });
