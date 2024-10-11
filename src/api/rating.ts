import axios, { AxiosError } from "axios";
import { uri } from "./uri";

// TYPES
import { RatingInterface } from "../interfaces/Rating";

export async function rateUser(
  rated_id: number,
  rater_id: number,
  body: RatingInterface
) {
  try {
    const { data } = await axios.post(
      `${uri}/users/${rated_id}/ratings/${rater_id}`,
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

export async function getUserRatings(rated_id: number) {
  try {
    const { data } = await axios.get(`${uri}/users/${rated_id}/ratings`);
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
