export interface GroupUserInterface {
  user_id?: number;
  group_id?: number;
  role?: GroupUserRoleEnum;
  status?: GroupUserStatusEnum;
  created_at?: Date;
  updated_at?: Date;
}

export enum GroupUserRoleEnum {
  TRAVELER = "TRAVELER",
  ORGANIZER = "ORGANIZER",
  AUTHOR = "AUTHOR",
}

export enum GroupUserStatusEnum {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DENIED = "DENIED",
}
