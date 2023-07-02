import {
  getSessionStorageItem,
  SessionStorageKey,
  setSessionStorageItem,
} from '../utils/session-storage';
import { useEffect, useState } from 'react';

type UseSessionStorageOptions = {
  key: SessionStorageKey;
  fallback?: string | null;
};
const useSessionStorage = ({ key, fallback = null }: UseSessionStorageOptions) => {
  const [storageValue, setValue] = useState(fallback);

  useEffect(() => {
    setValue(getSessionStorageItem(key));
  }, [key]);

  const setStorageValue = (value: string) => {
    setSessionStorageItem(key, value);
    setValue(value);
  };

  return { storageValue, setStorageValue };
};

export default useSessionStorage;
