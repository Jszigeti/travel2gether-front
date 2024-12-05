// API URI
// import { uri } from "./uri";

// AXIOS
import { AxiosError } from "axios";
import { useApi } from "../hooks/useApi/useApi";

// INTERFACES
import { UserInterface } from "../interfaces/User";
import { userDetails } from "../data/userDetails";

const api = useApi();

export async function signup(body: UserInterface) {
  try {
    const { data } = await api.post("signup", body);
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function signin(body: UserInterface) {
  try {
    const { data } = await api.post("signin", body);
    return data;
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

export async function editPassword(id: number, body: UserInterface) {
  try {
    // const { data } = await axios.put(`${uri}/users/${id}/password`, { body });
    // return data.body;
    return body;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getUser(id: number) {
  try {
    // const { data } = await axios.post(`${uri}/users/${id}`, { body });
    // return data.body;
    const data = userDetails;
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function editUser(id: number, body: UserInterface) {
  try {
    // const { data } = await axios.put(`${uri}/users/${id}`, { body });
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
    // const { data } = await axios.delete(`${uri}/users/${id}`);
    // return data;
    return id;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
