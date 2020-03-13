import { JwtPayload } from './jwt-payload.interface';

export interface AuthResponse {
  payload: JwtPayload,
  access_token: string;
}