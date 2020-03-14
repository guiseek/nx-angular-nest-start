import { IName } from './user.interfaces';

export interface IForgotPassword {
  email: string;
  lastPassword?: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IForgotPasswordResponse {
  id: number;
  resetPassword: {
    token: string;
    expires: Date;
  };
}

export interface IRegister {
  name: IName;
  email: string;
  password: string;
}