// AXIOS
import axios, { AxiosError } from "axios";

// INTERFACES
import { MessageInterface } from "../interfaces/Message";

export async function sendMessageToUser(
  user_receiver_id: number,
  sender_id: number,
  body: MessageInterface
) {
  try {
    const { data } = await axios.post(
      `/users/${user_receiver_id}/messages/${sender_id}`,
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

export async function sendMessageToGroup(
  group_receiver_id: number,
  sender_id: number,
  body: MessageInterface
) {
  try {
    const { data } = await axios.post(
      `/groups/${group_receiver_id}/messages/${sender_id}`,
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

export async function getAllMessagesWithUser(
  user_receiver_id: number,
  sender_id: number
) {
  try {
    const { data } = await axios.get(
      `/users/${user_receiver_id}/messages/${sender_id}`
    );
    return data.body;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getAllMessagesWithGroup(group_receiver_id: number) {
  try {
    const { data } = await axios.get(`/groups/${group_receiver_id}/messages`);
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
