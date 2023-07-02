import { createContext, PropsWithChildren, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

type UserContextValues = {
  username: string | null;
  setUser: (user: string) => void;
};

const UserContext = createContext<UserContextValues>({
  username: null,
  setUser: () => undefined,
});

type UserWrapperProps = PropsWithChildren;
export function UserWrapper({ children }: UserWrapperProps) {
  const { storageValue: username, setStorageValue } = useLocalStorage({
    key: 'username',
  });

  const setUser = (user: string) => {
    setStorageValue(user);
  };

  return (
    <UserContext.Provider value={{ username, setUser }}>{children}</UserContext.Provider>
  );
}
export function useUserContext() {
  return useContext(UserContext);
}
