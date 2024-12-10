// AXIOS
import { useApi } from "../hooks/useApi/useApi";

// UTILS FUNCTIONS
import { handleError } from "../utils/errorHandler";

export function useMatchingApi() {
  const api = useApi();

  const matchingUsers = async () => {
    try {
      const { data } = await api.get("match/users");
      return data;
    } catch (error: unknown) {
      const errorMessage = handleError(
        error,
        404,
        "Impossible de récupérer vos préférences"
      );
      throw new Error(errorMessage);
    }
  };
  const matchingGroups = async () => {
    try {
      const { data } = await api.get("match/groups");
      return data;
    } catch (error: unknown) {
      const errorMessage = handleError(
        error,
        404,
        "Impossible de récupérer vos préférences"
      );
      throw new Error(errorMessage);
    }
  };
  return {
    matchingUsers,
    matchingGroups,
  };
}
