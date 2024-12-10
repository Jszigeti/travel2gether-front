// API URI
import { useApi } from "../hooks/useApi/useApi";

// AXIOS
import { handleError } from "../utils/errorHandler";

// INTERFACES
import { ChecklistInterface } from "../interfaces/Checklist";
export function useChecklistApi() {
  const api = useApi();

  const createGroupChecklistItem = async (
    group_id: number,
    body: ChecklistInterface
  ) => {
    try {
      const { data } = await api.post(`checklist/groups/${group_id}`, {
        body,
      });
      return data.body;
      //return body;
    } catch (error: unknown) {
      const errorMessage = handleError(error, [403, 404], {
        403: "Droits requis",
        404: "Aucun groupe associé",
      });
      throw new Error(errorMessage);
    }
  };

  const createStageChecklistItem = async (
    group_id: number,
    stage_id: number,
    body: ChecklistInterface
  ) => {
    try {
      const { data } = await api.post(
        `checklist/groups/${group_id}/stages/${stage_id}`,
        { body }
      );
      return data.body;
    } catch (error: unknown) {
      const errorMessage = handleError(error, [403, 404], {
        403: "Droits requis",
        404: "Aucun groupe ou étape associé",
      });
      throw new Error(errorMessage);
    }
  };

  const getGroupChecklist = async (group_id: number) => {
    try {
      const { data } = await api.get(`checklist/groups/${group_id}`);
      return data;
    } catch (error: unknown) {
      const errorMessage = handleError(error, [403, 404], {
        403: "Membres de groupe seulement",
        404: "Ce groupe n'existe pas",
      });
      throw new Error(errorMessage);
    }
  };

  const getStageChecklist = async (group_id: number, stage_id: number) => {
    try {
      const { data } = await api.get(
        `checklist/groups/${group_id}/stages/${stage_id}`
      );
      return data;
    } catch (error: unknown) {
      const errorMessage = handleError(error, [403, 404], {
        403: "Membres de groupe seulement",
        404: "Ce groupe ou cette étape n'existe pas",
      });
      throw new Error(errorMessage);
    }
  };

  const deleteChecklistItem = async (checklist_id: number) => {
    try {
      const { data } = await api.delete(`checklist/${checklist_id}`);
      return data;
    } catch (error: unknown) {
      const errorMessage = handleError(error, [403, 404], {
        403: "Droits requis",
        404: "Item non trouvé",
      });
      throw new Error(errorMessage);
    }
  };

  return {
    createGroupChecklistItem,
    createStageChecklistItem,
    getGroupChecklist,
    getStageChecklist,
    deleteChecklistItem,
  };
}
