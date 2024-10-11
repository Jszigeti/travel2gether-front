import axios, { AxiosError } from "axios";
import { uri } from "./uri";

export async function reportUser(moderated_id: number, moderater_id: number) {
  try {
    const { data } = await axios.post(
      `${uri}/moderations/${moderated_id}/report/${moderater_id}`
    );
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function blockUser(moderated_id: number, moderater_id: number) {
  try {
    const { data } = await axios.post(
      `${uri}/moderations/${moderated_id}/block/${moderater_id}`
    );
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getAllBlockedUsers(moderater_id: number) {
  try {
    const { data } = await axios.get(
      `${uri}/moderations/${moderater_id}/block`
    );
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getAllUsersWhoBlocked(moderated_id: number) {
  try {
    const { data } = await axios.get(
      `${uri}/moderations/${moderated_id}/block`
    );
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function deleteUserBlock(
  moderater_id: number,
  moderated_id: number
) {
  try {
    const { data } = await axios.delete(
      `${uri}/moderations/${moderater_id}/block/${moderated_id}`
    );
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
