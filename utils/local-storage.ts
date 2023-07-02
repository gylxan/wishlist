export type LocalStorageKey = 'username';
export const setLocalStorageItem = (key: LocalStorageKey, value: string) => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(key, value);
  }
};

export const getLocalStorageItem = (key: LocalStorageKey) => {
  if (typeof window !== 'undefined') {
    return window.sessionStorage.getItem(key);
  }
  return null;
};
