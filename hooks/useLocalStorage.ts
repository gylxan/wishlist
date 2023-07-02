import { useEffect, useState } from 'react';
import {
  getLocalStorageItem,
  LocalStorageKey,
  setLocalStorageItem,
} from '../utils/local-storage';

type UseLocalStorageOptions = {
  key: LocalStorageKey;
  fallback?: string | null;
};
const useLocalStorage = ({ key, fallback = null }: UseLocalStorageOptions) => {
  const [storageValue, setValue] = useState(fallback);

  useEffect(() => {
    setValue(getLocalStorageItem(key));
  }, [key]);

  const setStorageValue = (value: string) => {
    setLocalStorageItem(key, value);
    setValue(value);
  };

  return { storageValue, setStorageValue };
};

export default useLocalStorage;
