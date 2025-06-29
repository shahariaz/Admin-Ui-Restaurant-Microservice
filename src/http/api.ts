import { ICredentials } from "../types";
import api from "./client";

//Auth Service
export const login = (credential: ICredentials) =>
  api.post("/auth/login", credential);

export const self = () => api.get("/auth/self");
export const logoutApi = () => api.post("/auth/logout");
export const getUsers = () => api.get("/user");
export const getTenants = () => api.get("/tenant/getall");
