// Axios
import { useApi } from "../hooks/useApi/useApi";

// Utils
import { customHandleError } from "../utils/customHandleError";

export function useModeratingApi() {
  const api = useApi();

  const reportUser = async (moderatedId: number) => {
    try {
      const { data } = await api.post(`/moderations/${moderatedId}`);
      return data;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(error, {
          400: "Vous avez déjà reporté cet utilisateur",
          404: "Utilisateur non trouvé, veuillez réessayer",
        })
      );
    }
  };

  return {
    reportUser,
  };
}
