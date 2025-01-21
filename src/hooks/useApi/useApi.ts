import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { customHandleError } from "../../utils/customHandleError";
import useAuthContext from "../context/useAuthContext";
import { toast } from "react-toastify";

export function useApi(): AxiosInstance {
  const { setAuthInfos } = useAuthContext();
  // Create axios instance with base url and cookies use
  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
  });

  const handleUnauthorizedError = (err: unknown): string => {
    return customHandleError(err, {
      401: "Session expirée, veuillez vous reconnecter",
      403: "Compte banni, merci de nous contacter pour avoir davantage d'informations",
    });
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
            toast.error(handleUnauthorizedError(refreshError));
            setAuthInfos(null);
          }
        }
      }
      return Promise.reject(error);
    }
  );
  // Return axios instance
  return api;
}
