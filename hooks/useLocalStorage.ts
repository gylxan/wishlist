import { useEffect, useState } from 'react';
import {
  getLocalStorageItem,
  LocalStorageKey,
  removeLocalStorageItem,
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

  const removeStorageValue = () => {
    removeLocalStorageItem(key);
    setValue(fallback);
  };

  return { storageValue, setStorageValue, removeStorageValue };
};

export default useLocalStorage;
