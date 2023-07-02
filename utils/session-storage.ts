type Key = 'show_fulfilled';
export const setSessionStorageItem = (key: Key, value: string) => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(key, value);
  }
};

export const getSessionStorageItem = (key: Key) => {
  if (typeof window !== 'undefined') {
    return window.sessionStorage.getItem(key);
  }
  return null;
};
