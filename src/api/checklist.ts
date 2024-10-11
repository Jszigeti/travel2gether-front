// API URI
import { uri } from "./uri";

// AXIOS
import axios, { AxiosError } from "axios";

// INTERFACES
import { ChecklistInterface } from "../interfaces/Checklist";

export async function createGroupChecklistItem(
  group_id: number,
  body: ChecklistInterface
) {
  try {
    const { data } = await axios.post(`${uri}/groups/${group_id}/checklist`, {
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

export async function createStageChecklistItem(
  group_id: number,
  stage_id: number,
  body: ChecklistInterface
) {
  try {
    const { data } = await axios.post(
      `${uri}/groups/${group_id}/stages/${stage_id}/checklist`,
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

export async function getGroupChecklist(group_id: number) {
  try {
    const { data } = await axios.get(`${uri}/groups/${group_id}/checklist`);
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function getStageChecklist(group_id: number, stage_id: number) {
  try {
    const { data } = await axios.get(
      `${uri}/groups/${group_id}/stages/${stage_id}/checklist`
    );
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function deleteGroupChecklistItem(
  group_id: number,
  checklist_id: number
) {
  try {
    const { data } = await axios.delete(
      `${uri}/groups/${group_id}/checklist/${checklist_id}`
    );
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}

export async function deleteStageChecklistItem(
  group_id: number,
  stage_id: number,
  checklist_id: number
) {
  try {
    const { data } = await axios.delete(
      `${uri}/groups/${group_id}/stages/${stage_id}/checklist/${checklist_id}`
    );
    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Axios error: ${axiosError.message}, status code: ${axiosError.response?.status}`
    );
  }
}
