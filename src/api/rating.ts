// AXIOS
import axios, { AxiosError } from "axios";

// INTERFACES
import { RatingInterface } from "../interfaces/Rating";

export function useRatingApi() {
  const rateUser = async (
    rated_id: number,
    rater_id: number,
    body: RatingInterface
  ) => {
    try {
      const { data } = await axios.post(
        `/users/${rated_id}/ratings/${rater_id}`,
        { body }
      );
      return data.body;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw new Error(
        `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
      );
    }
  };

  const getUserRatings = async (rated_id: number) => {
    try {
      const { data } = await axios.get(`/users/${rated_id}/ratings`);
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw new Error(
        `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
      );
    }
  };

  return {
    rateUser,
    getUserRatings,
  };
}
