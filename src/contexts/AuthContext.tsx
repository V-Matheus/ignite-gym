import { UserDTO } from '@dtos/UserDTO';
import { Children, createContext, ReactNode, useState } from 'react';

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => void;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({
    id: '1',
    name: 'Matheus',
    email: 'victormatheus507@gmail.com',
    avatar: 'matheus.png',
  });

  function signIn(email: string, password: string) {
    setUser({
      id: '',
      name: '',
      email,
      avatar: '',
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
