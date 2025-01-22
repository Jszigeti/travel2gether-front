// AXIOS
import { useApi } from "../hooks/useApi/useApi";
import { NotificationInterface } from "../interfaces/Notification";
// UTILS FUNCTIONS
import { customHandleError } from "../utils/customHandleError";

export function useNotifApi() {
  const api = useApi();

  const getNotifications = async (): Promise<NotificationInterface[]> => {
    try {
      const { data } = await api.get(`notifications`);
      return data;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(
          error,
          "Les notifications n'ont pas pu être récupérées"
        )
      );
    }
  };

  const markAsRead = async (notification_id: number) => {
    try {
      const { data } = await api.patch(`notifications/${notification_id}`);
      return data;
    } catch (error: unknown) {
      throw new Error(customHandleError(error, "Mise à jour échouée"));
    }
  };

  const deleteNotification = async (notification_id: number) => {
    try {
      const { data } = await api.delete(`notifications/${notification_id}`);
      return data;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(error, "La notification n'a pas pu être supprimée")
      );
    }
  };

  return {
    getNotifications,
    markAsRead,
    deleteNotification,
  };
}
