// AXIOS
import { useApi } from "../hooks/useApi/useApi";

// INTERFACES
import { GroupUserRoleEnum } from "../interfaces/GroupUser";

// UTILS FUNCTIONS
import { customHandleError } from "../utils/customHandleError";

export function useGroupApi() {
  const api = useApi();

  const getGroup = async (groupId: number) => {
    try {
      const { data } = await api.get(`groups/${groupId}`);
      return data;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(
          error,
          "Erreur lors de la récupération du groupe, veuillez réessayer plus tard"
        )
      );
    }
  };

  const getLastGroups = async () => {
    try {
      const { data } = await api.get("groups");
      return data;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(
          error,
          "Erreur lors de la récupération des groupes, veuillez réessayer plus tard"
        )
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
      throw new Error(
        customHandleError(
          error,
          "Erreur la récupération des groupes, veuillez réessayer plus tard"
        )
      );
    }
  };

  const createGroup = async (body: FormData) => {
    try {
      const { data } = await api.post(`groups`, body);
      return data;
    } catch (error) {
      throw new Error(
        customHandleError(
          error,
          "Erreur lors de la création du groupe, veuillez réessayer plus tard"
        )
      );
    }
  };

  const editGroup = async (group_id: number, body: FormData) => {
    try {
      const { data } = await api.patch(`/groups/${group_id}`, body);
      return data.body;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(
          error,
          "Erreur lors de la modification du groupe, veuillez réessayer plus tard"
        )
      );
    }
  };

  const deleteGroup = async (group_id: number) => {
    try {
      const { data } = await api.delete(`/groups/${group_id}`);
      return data;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(
          error,
          "Erreur lors de la suppression du groupe, veuillez réessayer plus tard"
        )
      );
    }
  };

  const invitUserToGroup = async (group_id: number, user_id: number) => {
    try {
      const { data } = await api.post(`/groups/${group_id}/users/${user_id}`);
      return data;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(
          error,
          "Erreur lors de l'ajout du membre, veuillez réessayer plus tard"
        )
      );
    }
  };

  const acceptUserGroupRequest = async (group_id: number, user_id: number) => {
    try {
      const { data } = await api.patch(
        `/groups/${group_id}/users/${user_id}/accept`
      );
      return data;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(
          error,
          "Erreur lors de l'accpetation du membre, veuillez réessayer plus tard"
        )
      );
    }
  };

  const kickUserFromGroup = async (group_id: number, user_id: number) => {
    try {
      const { data } = await api.patch(
        `/groups/${group_id}/users/${user_id}/kick`
      );
      return data;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(
          error,
          "Erreur lors de l'exclusion du membre, veuillez réessayer plus tard"
        )
      );
    }
  };

  const editUserRoleFromGroup = async (
    group_id: number,
    user_id: number,
    role: GroupUserRoleEnum
  ) => {
    try {
      const { data } = await api.patch(
        `groups/${group_id}/users/${user_id}/${role}`
      );
      return data.body;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(
          error,
          "Erreur lors de la modification du membre, veuillez réessayer plus tard"
        )
      );
    }
  };

  const joinGroup = async (group_id: number) => {
    try {
      const { data } = await api.post(`/groups/${group_id}/users`);
      return data;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(
          error,
          "Erreur lors de la demande d'adhésion, veuillez réessayer plus tard"
        )
      );
    }
  };

  const leaveGroup = async (group_id: number) => {
    try {
      const { data } = await api.delete(`/groups/${group_id}/users`);
      return data;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(
          error,
          "Erreur lors de la demande de départ, veuillez réessayer plus tard"
        )
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
    invitUserToGroup,
    acceptUserGroupRequest,
    kickUserFromGroup,
    editUserRoleFromGroup,
    joinGroup,
    leaveGroup,
  };
}
