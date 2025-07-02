export interface ICredentials {
  email: string;
  password: string;
}
export interface IUser {
  id: number;
  firstName?: string;
  lastName?: string;
  role?: string;
  tenantId?:number;
  email?: string;
  created_at?: string;
  updated_at?: string;
}
export type Tenant = { id: number; name: string; address: string };
