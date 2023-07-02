export const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return `${process.env.NEXT_PUBLIC_URL}/api`;
  }

  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;
};

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const doApiCall = (url: string, method: Method, data?: unknown) =>
  fetch(`${getBaseUrl()}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(data ? { body: JSON.stringify(data) } : null),
  });
