// AXIOS
import { useApi } from "../hooks/useApi/useApi";

// UTILS FUNCTIONS
import { handleError } from "../utils/errorHandler";

export function useProfileApi() {
  const api = useApi();

  const getLastProfiles = async () => {
    try {
      const { data } = await api.get("users/profiles");
      return data;
    } catch (error: unknown) {
      throw new Error(error);
    }
  };
  const getProfiles = async (query: any) => {
    const params = {
      ...query,
      page: query.page || 1,
      limit: query.limit || 10,
    };

    try {
      const { data } = await api.get("users/search", {
        params,
      });
      return data;
    } catch (error) {
      console.error("Erreur lors de la recherche des profiles :", error);
      throw error;
    }
  };
  return {
    getLastProfiles,
    getProfiles,
  };
}

// AXIOS
import { AxiosError } from "axios";

// INTERFACES
import { ProfileInterface } from "../interfaces/Profile";
import { profilesList } from "../data/profilesList";
import { profileDetails } from "../data/profileDetails";
import { useApi } from "../hooks/useApi/useApi";
import { customHandleError } from "../utils/customHandleError";

export function useProfileApi() {
  const api = useApi();

  const editProfile = async (body: FormData) => {
    try {
      const { data } = await api.patch("users/profile", body);
      return data;
    } catch (error: unknown) {
      throw new Error(customHandleError(error, "Profile non trouvé", 404));
    }
  };

  const getProfile = async (user_id: number) => {
    try {
      const { data } = await api.get(`users/${user_id}/profile`);
      return data;
    } catch (error: unknown) {
      throw new Error(customHandleError(error, "Profile non trouvé", 404));
    }
  };

  return {
    editProfile,
    getProfile,
  };
}
