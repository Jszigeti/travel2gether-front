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
  TRAVELER = "Voyageur",
  ORGANIZER = "Organisateur",
  AUTHOR = "Auteur",
}

export enum GroupUserStatusEnum {
  PENDING = "En attente",
  ACCEPTED = "Accepté",
  DENIED = "Refusé",
}
