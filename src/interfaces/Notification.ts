export interface NotificationInterface {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  referenceId: number;
  referenceType: NotificationEnum[];
  details: string;
  isRead: boolean;
}

export enum NotificationEnum {
  PRIVATE_MESSAGE = "Message privé",
  GROUP_MESSAGE = "Message de groupe",
  GROUP_MODIFICATION = "Modification de groupe",
}
