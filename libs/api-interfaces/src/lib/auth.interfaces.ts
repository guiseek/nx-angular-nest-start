export interface AuthPayload {
  id: number;
  email: string;
  name: {
    first?: string;
  };
}
export interface AuthSuccessResponse {
  payload: AuthPayload,
  access_token: string;
}