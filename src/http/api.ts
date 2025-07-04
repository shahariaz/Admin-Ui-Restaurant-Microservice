import { ICredentials, IUser } from "../types";
import api from "./client";

//Auth Service
export const login = (credential: ICredentials) =>
  api.post("/auth/login", credential);

export const self = () => api.get("/auth/self");
export const logoutApi = () => api.post("/auth/logout");
export const getUsers = (queryString:string) => api.get(`/user?${queryString}`);
export const getTenants = () => api.get("/tenant/getall");
export const createUser =(userData:IUser)=> api.post("/user",userData);