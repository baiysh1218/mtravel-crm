import { ACCESS_USER } from "@/shared/constants";

export interface User extends Token {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: ACCESS_USER;
}

export interface Token {
  refresh?: string;
  access?: string;
}

export interface AuthorizeUser {
  username: string;
  password: string;
}

export interface SaveToken extends Token {
  rememberMe?: boolean;
}
