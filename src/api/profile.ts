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

const api = useApi();

export async function createProfile(user_id: number) {
  try {
    // const { data } = await axios.post(`${uri}/users/${user_id}/profile`);
    // return data;
    return user_id;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function editProfile(body: FormData) {
  try {
    const { data } = await api.patch("users/profile", body);
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getProfile(user_id: number) {
  try {
    // const { data } = await axios.get(`${uri}/users/${user_id}/profile`);
    const data = profileDetails;
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getProfiles(body: ProfileInterface) {
  try {
    const data = profilesList;
    return data;
    // const { data } = await axios.post(`${uri}/users/profiles`, { body });
    // return data.body;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
