export interface ICredentials {
  email: string;
  password: string;
}
export interface IUser {
  id: number;
  firstName?: string;
  lastName?: string;
  role?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
}
