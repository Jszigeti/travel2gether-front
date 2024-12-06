// AXIOS
import { useApi } from "../hooks/useApi/useApi";

// UTILS FUNCTIONS
import { handleError } from "../utils/errorHandler";

export function useGroupApi() {
  const api = useApi();

  const getLastGroups = async () => {
    try {
      const { data } = await api.get("groups");
      return data;
    } catch (error: unknown) {
      throw new Error(error);
    }
  };

  const getGroups = async (query: any) => {
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
    getLastGroups,
    getGroups,
  };
}

// API URI
import { uri } from "./uri";

// AXIOS
import axios, { AxiosError } from "axios";

// INTERFACES
import { GroupInterface } from "../interfaces/Group";
import { GroupUserInterface } from "../interfaces/GroupUser";
import { groupsList } from "../data/groupsList";
import { groupDetails } from "../data/groupDetails";

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

export async function editGroup(group_id: number, body: GroupInterface) {
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

export async function getGroup(group_id: number) {
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

export async function getGroups(body: GroupInterface) {
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

export async function addUserToGroup(group_id: number, user_id: number) {
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
  group_id: number,
  user_id: number,
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

export async function deleteUserFromGroup(group_id: number, user_id: number) {
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
