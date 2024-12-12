// AXIOS
import axios, { AxiosError } from "axios";

export async function reportUser(moderated_id: number, moderater_id: number) {
  try {
    const { data } = await axios.post(
      `/moderations/${moderated_id}/report/${moderater_id}`
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
      `/moderations/${moderated_id}/block/${moderater_id}`
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
    const { data } = await axios.get(`/moderations/${moderater_id}/block`);
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
    const { data } = await axios.get(`/moderations/${moderated_id}/block`);
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
      `/moderations/${moderater_id}/block/${moderated_id}`
    );
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
