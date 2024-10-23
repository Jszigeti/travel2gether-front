export interface GroupUserInterface {
  user_id?: number;
  group_id?: number;
  role?: GroupUserRoleEnum[];
  status?: GroupUserStatusEnum[];
  created_at?: Date;
  updated_at?: Date;
}

export interface PendingUserInterface {
  user_id: number;
  path_picture: string;
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
