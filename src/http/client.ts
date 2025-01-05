import axios from "axios";
import { useAuthStore } from "../store";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
const refreshToken = async () => {
  await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
};
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._isRetry) {
      try {
        originalRequest._isRetry = true;
        const headers = { ...originalRequest.headers };
        await refreshToken();
        return api.request({ ...originalRequest, headers });
      } catch (err) {
        console.error("Token refresh error", err);
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
