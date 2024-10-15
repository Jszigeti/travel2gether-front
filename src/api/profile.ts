// API URI
import { uri } from "./uri";

// AXIOS
import axios, { AxiosError } from "axios";

// INTERFACES
import { ProfileInterface } from "../interfaces/Profile";
import { profilesList } from "../data/profilesList";

export async function createProfile(user_id: number) {
  try {
    // const { data } = await axios.post(`${uri}/users/${user_id}/profile`);
    // return data;
    return user_id;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function editProfile(user_id: number, body: ProfileInterface) {
  try {
    // const { data } = await axios.put(`${uri}/users/${user_id}/profile`, {
    //   body,
    // });
    // return data.body;
    return `${user_id} ${body}`;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function deleteProfile(user_id: number) {
  try {
    const { data } = await axios.delete(`${uri}/users/${user_id}/profile`);
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getProfile(user_id: number) {
  try {
    const { data } = await axios.get(`${uri}/users/${user_id}/profile`);
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getProfiles() {
  // body: ProfileInterface à remettre dans le paramètre de la fonction
  try {
    const data = profilesList;
    return data;
    // const { data } = await axios.post(`${uri}/users/profiles`, { body });
    // return data.body;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
