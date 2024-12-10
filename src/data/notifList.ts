import { NotificationEnum } from "../interfaces/Notification";

export const notifList = [
  {
    id: 1,
    userId: 1,
    referenceId: 3,
    referenceType: [NotificationEnum.GROUP_MESSAGE],
    isRead: false,
    details: "Voyage en Normandie",
  },
  {
    id: 2,
    userId: 1,
    referenceId: 3,
    referenceType: [NotificationEnum.GROUP_MESSAGE],
    isRead: false,
    details: "Voyage en Normandie",
  },
  {
    id: 3,
    userId: 1,
    referenceId: 3,
    referenceType: [NotificationEnum.PRIVATE_MESSAGE],
    isRead: false,
    details: "Charles",
  },
  {
    id: 4,
    userId: 1,
    referenceId: 2,
    referenceType: [NotificationEnum.GROUP_MODIFICATION],
    isRead: true,
    details: "Musée du Louvre",
  },
];
