// API URI
import { uri } from "./uri";

// AXIOS
import axios, { AxiosError } from "axios";

// INTERFACES
import { StageInterface } from "../interfaces/Stage";
import { stageDetails } from "../data/stageDetails";

export async function createStage(group_id: number, body: StageInterface) {
  try {
    // const { data } = await axios.post(`${uri}/groups/${group_id}/stages`, {
    //   body,
    // });
    // return data.body;
    return body;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getStageFromGroup(group_id: number, stage_id: number) {
  try {
    // const { data } = await axios.get(
    //   `${uri}/groups/${group_id}/stages/${stage_id}`
    // );
    const data = stageDetails;
    console.log("getStageFromGroup : ", data);

    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getStagesFromGroup(group_id: number) {
  try {
    const { data } = await axios.post(`${uri}/groups/${group_id}/stages`);
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function editStage(
  group_id: number,
  stage_id: number,
  body: StageInterface
) {
  try {
    // const { data } = await axios.put(
    //   `${uri}/groups/${group_id}/stages/${stage_id}`,
    //   {
    //     body,
    //   }
    // );
    // return data.body;
    return body;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function deleteStage(group_id: number, stage_id: number) {
  try {
    const { data } = await axios.delete(
      `${uri}/groups/${group_id}/stages/${stage_id}`
    );
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
