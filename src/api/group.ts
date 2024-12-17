/* eslint-disable @typescript-eslint/no-unused-vars */
// AXIOS
import { useApi } from "../hooks/useApi/useApi";

// INTERFACES
import { GroupUserInterface } from "../interfaces/GroupUser";

// UTILS FUNCTIONS
import { customHandleError } from "../utils/customHandleError";

export function useGroupApi() {
  const api = useApi();

  const getGroup = async (groupId: number) => {
    try {
      const { data } = await api.get(`groups/${groupId}`);
      return data;
    } catch (error: unknown) {
      throw new Error(customHandleError(error, "Ce groupe n'existe pas"));
    }
  };

  const getLastGroups = async () => {
    try {
      const { data } = await api.get("groups");
      return data;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(error, "Une erreur inconnue est survenue")
      );
    }
  };

  const getGroups = async (query: { [k: string]: string | undefined }) => {
    const params = {
      ...query,
      page: query.page || 1,
      limit: query.limit || 10,
    };

    try {
      const { data } = await api.get("groups/search", {
        params,
      });
      return data;
    } catch (error) {
      console.error("Erreur lors de la recherche des groupes :", error);
      throw error;
    }
  };

  const createGroup = async (body: FormData) => {
    try {
      const { data } = await api.post(`groups`, body);
      return data;
    } catch (error) {
      throw new Error(
        customHandleError(error, "Le groupe n'a pas pu être ajouté")
      );
    }
  };

  const editGroup = async (group_id: number, body: FormData) => {
    try {
      const { data } = await api.put(`/groups/${group_id}`, {
        body,
      });
      return data.body;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(error, "Le groupe n'a pas pu être modifié")
      );
    }
  };

  const deleteGroup = async (group_id: number) => {
    try {
      const { data } = await api.delete(`/groups/${group_id}`);
      return data;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(error, "Le groupe n'a pas pu être supprimé")
      );
    }
  };

  const addUserToGroup = async (group_id: number, user_id: number) => {
    try {
      const { data } = await api.post(`/groups/${group_id}/users/${user_id}`);
      return data;
    } catch (error: unknown) {
      throw new Error(customHandleError(error, "Invitation échouée"));
    }
  };

  const deleteUserFromGroup = async (group_id: number, user_id: number) => {
    try {
      const { data } = await api.delete(`/groups/${group_id}/users/${user_id}`);
      return data;
    } catch (error: unknown) {
      throw new Error(customHandleError(error, "Sortie du groupe échouée"));
    }
  };

  const editUserFromGroup = async (
    group_id: number,
    user_id: number,
    body: GroupUserInterface
  ) => {
    try {
      const { data } = await api.put(`groups/${group_id}/users/${user_id}`, {
        body,
      });
      return data.body;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(error, "Le status du membre n'a pas pu être modifié")
      );
    }
  };

  return {
    getGroup,
    getLastGroups,
    getGroups,
    createGroup,
    editGroup,
    deleteGroup,
    addUserToGroup,
    deleteUserFromGroup,
    editUserFromGroup,
  };
}
