export interface NotificationInterface {
  id?: number;
  userId?: number;
  referenceId?: number;
  referenceType?: NotificationEnum[];
  isRead?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NotificationComponentInterface {
  id: number;
  userId: number;
  referenceId: number;
  referenceType: NotificationEnum[];
  isRead: boolean;
  details: string;
}

export enum NotificationEnum {
  PRIVATE_MESSAGE = "Message privé",
  GROUP_MESSAGE = "Message de groupe",
  GROUP_MODIFICATION = "Modification de groupe",
}
