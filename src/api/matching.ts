// AXIOS
import { useApi } from "../hooks/useApi/useApi";

// UTILS FUNCTIONS
import { customHandleError } from "../utils/customHandleError";

export function useMatchingApi() {
  const api = useApi();

  const matchingUsers = async () => {
    try {
      const { data } = await api.get("match/users");
      return data;
    } catch (error: unknown) {
      const errorMessage = customHandleError(
        error,
        "Impossible de récupérer vos préférences",
        404
      );
      throw new Error(errorMessage);
    }
  };
  const matchingGroups = async () => {
    try {
      const { data } = await api.get("match/groups");
      return data;
    } catch (error: unknown) {
      const errorMessage = customHandleError(
        error,
        "Impossible de récupérer vos préférences",
        404
      );
      throw new Error(errorMessage);
    }
  };
  return {
    matchingUsers,
    matchingGroups,
  };
}
