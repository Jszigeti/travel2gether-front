export interface UserInterface {
  id?: number;
  email?: string;
  password?: string;
  status?: UserStatusEnum[];
  createdAt?: Date;
  updatedAt?: Date;
}

export enum UserStatusEnum {
  NOT_VERIFIED = "Non vérifié",
  VERIFIED = "Vérifié",
  BANNED = "Banni",
}
