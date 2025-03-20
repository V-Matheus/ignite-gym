import { UserDTO } from '@dtos/UserDto';
import { Children, createContext, ReactNode } from 'react';

export type AuthContextDataProps = {
  user: UserDTO;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: '1',
          name: 'Matheus',
          email: 'victormatheus507@gmail.com',
          avatar: 'matheus.png',
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
