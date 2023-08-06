import {
  getSessionStorageItem,
  SessionStorageKey,
  setSessionStorageItem,
} from '../utils/session-storage';
import { useState } from 'react';

type UseSessionStorageOptions = {
  key: SessionStorageKey;
  fallback?: string | null;
};
const useSessionStorage = ({ key, fallback = null }: UseSessionStorageOptions) => {
  const [storageValue, setValue] = useState(() => {
    const sessionValue = getSessionStorageItem(key);
    return sessionValue || fallback;
  });

  const setStorageValue = (value: string) => {
    setSessionStorageItem(key, value);
    setValue(value);
  };

  return { storageValue, setStorageValue };
};

export default useSessionStorage;
