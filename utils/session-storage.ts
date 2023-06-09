export type SessionStorageKey = 'show_fulfilled';
export const setSessionStorageItem = (key: SessionStorageKey, value: string) => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(key, value);
  }
};

export const getSessionStorageItem = (key: SessionStorageKey) => {
  if (typeof window !== 'undefined') {
    return window.sessionStorage.getItem(key);
  }
  return null;
};
