import { UserDTO } from '@dtos/UserDto';
import { createContext } from 'react';

export type AuthContextDataProps = {
  user: UserDTO;
};

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);
