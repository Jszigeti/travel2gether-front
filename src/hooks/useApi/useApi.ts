import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
// import { useNavigate } from "react-router-dom";

export function useApi(): AxiosInstance {
  // const navigate = useNavigate()
  // Create axios instance with base url and cookies use
  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
  });

  // Create response interceptor to refresh token if error is 401
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Store original request
        const originalRequest = error.config;
        if (originalRequest) {
          try {
            // Call refresh token endpoint
            await api.post("refresh");
            // Retry original request
            return api(originalRequest);
          } catch (refreshError: unknown) {
            if (refreshError instanceof AxiosError) {
              console.error(
                `Token refresh failed: ${refreshError.message}, status: ${refreshError.response?.status}`
              );
            }
            return Promise.reject(refreshError);
          }
        }
      }
      if (error instanceof AxiosError) {
        console.error(
          `Request failed: ${error.message}, status: ${error.response?.status}`
        );
      }
      return Promise.reject(error);
    }
  );
  // Return axios instance
  return api;
}
