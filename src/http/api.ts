import { ICredentials } from "../types";
import api from "./client";

//Auth Service
export const login = (credential: ICredentials) =>
  api.post("/auth/login", credential);

export const self = () => api.get("/auth/self");
