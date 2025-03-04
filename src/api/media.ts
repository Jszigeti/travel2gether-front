// AXIOS
import axios, { AxiosError } from "axios";

// INTERFACES
import { MediaInterface } from "../interfaces/Media";

export async function createMedia(
  group_id: number,
  user_id: number,
  body: MediaInterface
) {
  try {
    const { data } = await axios.post(`/groups/${group_id}/media/${user_id}`, {
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

export async function getMediasFromGroup(group_id: number) {
  try {
    const { data } = await axios.get(`/groups/${group_id}/media`);
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function deleteMedia(group_id: number, media_id: number) {
  try {
    const { data } = await axios.delete(
      `/groups/${group_id}/media/${media_id}`
    );
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
