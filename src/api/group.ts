// API URI
import { uri } from "./uri";

// AXIOS
import axios, { AxiosError } from "axios";

// INTERFACES
import { GroupInterface } from "../interfaces/Group";
import { GroupUserInterface } from "../interfaces/GroupUser";
import { groupsList } from "../data/groupsList";

export async function createGroup(body: GroupInterface) {
  try {
    const { data } = await axios.post(`${uri}/groups`, { body });
    return data.body;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function editGroup(group_id: number, body: GroupInterface) {
  try {
    const { data } = await axios.put(`${uri}/groups/${group_id}`, {
      body,
    });
    return data.body;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function deleteGroup(group_id: number) {
  try {
    const { data } = await axios.delete(`${uri}/groups/${group_id}`);
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getGroup(group_id: number) {
  try {
    const { data } = await axios.get(`${uri}/groups/${group_id}`);
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getGroups() {
  // body: GroupInterface[] à remettre dans le paramètre de la fonction
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
    const { data } = await axios.post(
      `${uri}/groups/${group_id}/users/${user_id}`
    );
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getUserFromGroup(group_id: number, user_id: number) {
  try {
    const { data } = await axios.get(
      `${uri}/groups/${group_id}/users/${user_id}`
    );
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getUsersFromGroup(group_id: number) {
  try {
    const { data } = await axios.get(`${uri}/groups/${group_id}/users`);
    return data;
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
    const { data } = await axios.put(
      `${uri}/groups/${group_id}/users/${user_id}`,
      { body }
    );
    return data.body;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function deleteUserFromGroup(group_id: number, user_id: number) {
  try {
    const { data } = await axios.delete(
      `${uri}/groups/${group_id}/users/${user_id}`
    );
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
