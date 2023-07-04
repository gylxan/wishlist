export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const doApiCall = async (url: string, method: Method, data?: unknown) => {
  const response = await fetch(`/api${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(data ? { body: JSON.stringify(data) } : null),
  }).then(async (response) => {
    if (response.ok) {
      return response;
    }
    throw Error(
      response.bodyUsed ? (await response.json()).message : response.statusText,
    );
  });
  return response.json();
};
