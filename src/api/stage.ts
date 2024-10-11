import axios, { AxiosError } from "axios";
import { uri } from "./uri";

// TYPES
import { StageInterface } from "../interfaces/Stage";

export async function createStage(group_id: number, body: StageInterface) {
  try {
    const { data } = await axios.post(`${uri}/groups/${group_id}/stages`, {
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

export async function getStageFromGroup(group_id: number, stage_id: number) {
  try {
    const { data } = await axios.get(
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
    const { data } = await axios.put(
      `${uri}/groups/${group_id}/stages/${stage_id}`,
      {
        body,
      }
    );
    return data.body;
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
