import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { customHandleError } from "../../utils/customHandleError";

export function useApi(): AxiosInstance {
  // Create axios instance with base url and cookies use
  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
  });

  const handleUnauthorizedError = (err: unknown): Promise<never> => {
    return Promise.reject(
      customHandleError(err, {
        401: "Session expirée, veuillez vous reconnecter",
        403: "Compte banni, merci de nous contacter pour avoir davantage d'informations",
      })
    );
  };

  // Create response interceptor to refresh token if error is 401
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retried &&
        originalRequest.url !== "refresh" &&
        originalRequest.url !== "me"
      ) {
        originalRequest._retried = true;
        // Store original request
        if (originalRequest) {
          try {
            // Call refresh token endpoint
            await api.post("refresh");
            // Retry original request
            return api(originalRequest);
          } catch (refreshError: unknown) {
            // Optional : redirection or logout function
            return handleUnauthorizedError(refreshError);
          }
        }
      }
      return Promise.reject(error);
    }
  );
  // Return axios instance
  return api;
}
