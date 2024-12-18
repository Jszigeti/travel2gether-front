export interface GroupUserInterface {
  userId?: number;
  groupId?: number;
  role?: GroupUserRoleEnum[];
  status?: GroupUserStatusEnum[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PendingUserInterface {
  userId: number;
  pathPicture: string;
  firstname: string;
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
