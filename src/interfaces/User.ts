export interface UserInterface {
  id?: number;
  email?: string;
  password?: string;
  status?: UserStatusEnum;
  created_at?: Date;
  updated_at?: Date;
}

export enum UserStatusEnum {
  NOT_VERIFIED = "NOT_VERIFIED",
  VERIFIED = "VERIFIED",
  BANNED = "BANNED",
}
