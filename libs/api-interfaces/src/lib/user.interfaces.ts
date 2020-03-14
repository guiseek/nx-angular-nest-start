export interface IResetPassword {
  token: string;
  expires: Date;
}

export interface IName {
  first: string;
  last: string;
}
export interface IConfirmation {
  code: string;
  time: Date | null;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  isActive: boolean;
  name: IName;
  confirmation: IConfirmation;
  resetPassword: IResetPassword;
}
