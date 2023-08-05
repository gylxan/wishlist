import { createContext, PropsWithChildren, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

type UserContextValues = {
  username: string | null;
  setUser: (user: string) => void;
  removeUser: () => void;
};

const UserContext = createContext<UserContextValues>({
  username: null,
  setUser: () => undefined,
  removeUser: () => undefined,
});

type UserWrapperProps = PropsWithChildren;
export function UserWrapper({ children }: UserWrapperProps) {
  const {
    storageValue: username,
    setStorageValue,
    removeStorageValue,
  } = useLocalStorage({
    key: 'username',
  });

  const setUser = (user: string) => {
    setStorageValue(user);
  };

  const removeUser = () => {
    removeStorageValue();
  };

  return (
    <UserContext.Provider value={{ username, setUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
}
export function useUserContext() {
  return useContext(UserContext);
}
