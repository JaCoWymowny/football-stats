import { ReactNode } from 'react';

export interface AuthData {
  username: string;
  password: string;
  email?: string;
}
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export type AuthGuardProps = {
  redirectPath?: string;
  children?: ReactNode;
};
