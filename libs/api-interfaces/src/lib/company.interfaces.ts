import { IUser } from './user.interfaces';

export interface ICompany {
  id: number;
  name: string;
  domain: string;
  description: string;
  users?: IUser[];
}
