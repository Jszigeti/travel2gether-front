export interface NotificationInterface {
  id?: number;
  user_id?: number;
  reference_id?: number;
  reference_type?: NotificationEnum;
  isRead?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export enum NotificationEnum {
  PRIVATE_MESSAGE = "Message privé",
  GROUP_MESSAGE = "Message de groupe",
  GROUP_MODIFICATION = "Modification de groupe",
}
