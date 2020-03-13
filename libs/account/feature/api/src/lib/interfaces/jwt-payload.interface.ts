export interface JwtPayload {
  id: number;
  email: string;
  name: {
    first?: string;
    last?: string;
  };
}