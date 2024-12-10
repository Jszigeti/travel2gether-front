/* eslint-disable @typescript-eslint/no-unused-vars */
// AXIOS
import { groupDetails } from "../data/groupDetails";
import { useApi } from "../hooks/useApi/useApi";

// UTILS FUNCTIONS
import { customHandleError } from "../utils/customHandleError";

export function useGroupApi() {
  const api = useApi();

  const getGroup = async (_groupId: number) => {
    return groupDetails;
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
  return {
    getGroup,
    getLastGroups,
    getGroups,
  };
}

// INTERFACES
import { GroupInterface } from "../interfaces/Group";
import { GroupUserInterface } from "../interfaces/GroupUser";
import { groupsList } from "../data/groupsList";
import { AxiosError } from "axios";

export async function createGroup(body: GroupInterface) {
  try {
    // const { data } = await axios.post(`${uri}/groups`, { body });
    // return data.body;
    return body;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function editGroup(_group_id: number, body: GroupInterface) {
  try {
    // const { data } = await axios.put(`${uri}/groups/${group_id}`, {
    //   body,
    // });
    // return data.body;
    return body;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function deleteGroup(group_id: number) {
  try {
    // const { data } = await axios.delete(`${uri}/groups/${group_id}`);
    // return data;
    return group_id;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getGroup(_group_id: number) {
  try {
    // const { data } = await axios.get(`${uri}/groups/${group_id}`);
    const data = groupDetails;
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getGroups(_body: GroupInterface) {
  try {
    const data = groupsList;
    return data;
    // const { data } = await axios.post(`${uri}/groups`, { body });
    //return data.body;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function addUserToGroup(_group_id: number, user_id: number) {
  try {
    // const { data } = await axios.post(
    //   `${uri}/groups/${group_id}/users/${user_id}`
    // );
    // return data;
    return user_id;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function editUserFromGroup(
  _group_id: number,
  _user_id: number,
  body: GroupUserInterface
) {
  try {
    //   const { data } = await axios.put(
    //     `${uri}/groups/${group_id}/users/${user_id}`,
    //     { body }
    //   );
    //   return data.body;
    return body;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function deleteUserFromGroup(_group_id: number, user_id: number) {
  try {
    // const { data } = await axios.delete(
    //   `${uri}/groups/${group_id}/users/${user_id}`
    // );
    // return data;
    return user_id;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
