// API URI
import { uri } from "./uri";

// AXIOS
import axios, { AxiosError } from "axios";

// INTERFACES
import { UserInterface } from "../interfaces/User";

export async function signup(body: UserInterface) {
  try {
    const { data } = await axios.post(`${uri}/users`, { body });
    return data.body;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function signin(body: UserInterface) {
  try {
    // const { data } = await axios.post(`${uri}/users/login`, body);
    // return data.body;
    return body;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function forgotPassword(body: UserInterface) {
  try {
    // const { data } = await axios.post(`${uri}/users/forgot`, { body });
    // return data.body;
    return body;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function deleteUser(id: number) {
  try {
    const { data } = await axios.delete(`${uri}/users/${id}`);
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
