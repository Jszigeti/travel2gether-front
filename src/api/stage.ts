/* eslint-disable @typescript-eslint/no-unused-vars */
// AXIOS
import { AxiosError } from "axios";

// INTERFACES
import { StageInterface } from "../interfaces/Stage";
import { stageDetails } from "../data/stageDetails";

export async function createStage(_group_id: number, body: StageInterface) {
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

export async function getStageFromGroup(_group_id: number, _stage_id: number) {
  try {
    // const { data } = await axios.get(
    //   `${uri}/groups/${group_id}/stages/${stage_id}`
    // );
    const data = stageDetails;

    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function editStage(
  _group_id: number,
  _stage_id: number,
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

export async function deleteStage(_group_id: number, stage_id: number) {
  try {
    // const { data } = await axios.delete(
    //   `${uri}/groups/${group_id}/stages/${stage_id}`
    // );
    // return data;
    return stage_id;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
