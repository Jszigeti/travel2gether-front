import axios, { AxiosError } from "axios";
import { uri } from "./uri";

// TYPES
import { ProfileInterface } from "../interfaces/Profile";

export async function createProfile(user_id: number, body: ProfileInterface) {
  try {
    const { data } = await axios.post(`${uri}/users/${user_id}/profile`, {
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

export async function editProfile(user_id: number, body: ProfileInterface) {
  try {
    const { data } = await axios.put(`${uri}/users/${user_id}/profile`, {
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

export async function getProfiles(body: ProfileInterface) {
  try {
    const { data } = await axios.post(`${uri}/users/profiles`, { body });
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
