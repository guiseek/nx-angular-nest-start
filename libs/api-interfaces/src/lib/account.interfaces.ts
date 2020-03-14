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
  }
}