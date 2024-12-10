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
