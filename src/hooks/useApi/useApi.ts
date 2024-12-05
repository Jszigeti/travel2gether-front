import axios, { AxiosInstance } from "axios";

export function useApi() {
  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
  });

  // api.interceptors.request.use((config) => {
  //   const token = localStorage.getItem("accessToken");
  //   // const token = document.cookie;

  //   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //   token ? (config.headers["Authorization"] = `Bearer ${token}`) : undefined;

  //   console.log("🚀 ~ api.interceptors.request.use ~ token:", token);
  //   return config;
  // });

  return api;
}
