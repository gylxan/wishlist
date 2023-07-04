import { doApiCall, type Method } from '../utils/api';
import { useState } from 'react';

type UseApiOptions = {
  method: Method;
  url: string;
};

type UseApiState<T> = {
  loading: boolean;
  error: null | string;
  data: T | null;
};

type UseApiFetchParams = {
  data?: unknown;
  id?: string | number;
};

export const useApi = <T = unknown>({ url, method }: UseApiOptions) => {
  const [state, setState] = useState<UseApiState<T>>({
    loading: false,
    error: null,
    data: null,
  });

  async function fetch({ id, data }: UseApiFetchParams = {}) {
    setState((state) => ({ ...state, error: null, loading: true }));
    try {
      const response = await doApiCall([url, id].filter(Boolean).join('/'), method, data);
      setState((state) => ({ ...state, data: response }));
      return response as T;
    } catch (e) {
      setState((state) => ({
        ...state,
        error: e instanceof Error ? e.message : String(e),
      }));
    } finally {
      setState((state) => ({ ...state, loading: false }));
    }
    return null;
  }

  return { ...state, fetch };
};
