/* eslint-disable @typescript-eslint/no-unused-vars */
// AXIOS
import { AxiosError } from "axios";

// INTERFACES
import { notifList } from "../data/notifList";

export async function getNotifications(_user_id: number) {
  try {
    // const { data } = await axios.get(`${uri}/users/${user_id}/notifications`);
    const data = notifList;
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function editNotification(
  _user_id: number,
  notification_id: number
) {
  try {
    // const { data } = await axios.put(
    //   `${uri}/users/${user_id}/notifications/${notification_id}`
    // );
    // return data;
    return notification_id;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
