// API URI
import { uri } from "./uri";

// AXIOS
import axios, { AxiosError } from "axios";

// INTERFACES
import { NotificationInterface } from "../interfaces/Notification";

export async function createNotification(
  user_id: number,
  reference_id: number,
  body: NotificationInterface
) {
  try {
    const { data } = await axios.post(
      `${uri}/users/${user_id}/notifications/${reference_id}`,
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

export async function getNotifications(user_id: number) {
  try {
    const { data } = await axios.get(`${uri}/users/${user_id}/notifications`);
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function editNotification(
  user_id: number,
  notification_id: number
) {
  try {
    const { data } = await axios.put(
      `${uri}/users/${user_id}/notifications/${notification_id}`
    );
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
