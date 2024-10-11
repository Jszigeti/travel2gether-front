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
  PRIVATE_MESSAGE = "PRIVATE_MESSAGE",
  GROUP_MESSAGE = "GROUP_MESSAGE",
  GROUP_MODIFICATION = "GROUP_MODIFICATION",
}
