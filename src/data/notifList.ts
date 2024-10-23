import { NotificationEnum } from "../interfaces/Notification";

export const notifList = [
  {
    id: 1,
    user_id: 1,
    reference_id: 3,
    reference_type: [NotificationEnum.GROUP_MESSAGE],
    isRead: false,
    details: "Voyage en Normandie",
  },
  {
    id: 2,
    user_id: 1,
    reference_id: 3,
    reference_type: [NotificationEnum.GROUP_MESSAGE],
    isRead: false,
    details: "Voyage en Normandie",
  },
  {
    id: 3,
    user_id: 1,
    reference_id: 3,
    reference_type: [NotificationEnum.PRIVATE_MESSAGE],
    isRead: true,
    details: "Charles",
  },
  {
    id: 4,
    user_id: 1,
    reference_id: 2,
    reference_type: [NotificationEnum.GROUP_MODIFICATION],
    isRead: true,
    details: "Musée du Louvre",
  },
];
