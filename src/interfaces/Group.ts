// INTERFACES
import { GroupUserRoleEnum, GroupUserStatusEnum } from "./GroupUser";
import {
  TravelTypesSet,
  LodgingsSet,
  GroupGenderEnum,
  SpokenLanguagesSet,
  BudgetEnum,
  GroupAgeRangesSet,
} from "./Matching";

export interface GroupInterface {
  id?: number;
  title?: string;
  description?: string;
  location?: string;
  dateFrom?: string;
  dateTo?: string;
  pathPicture?: string;
  file?: Blob;
  status?: GroupStatusEnum[];
  travelTypes?: TravelTypesSet[];
  lodgings?: LodgingsSet[];
  gender?: GroupGenderEnum[];
  spokenLanguages?: SpokenLanguagesSet[];
  budget?: BudgetEnum[];
  ageRanges?: GroupAgeRangesSet[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GroupCardInterface {
  id: number;
  title: string;
  pathPicture: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  profiles?: {
    userId: number;
    pathPicture: string;
    role: GroupUserRoleEnum[];
    status: GroupUserStatusEnum[];
  }[];
}

export interface GroupPageInterface {
  id: number;
  title: string;
  description: string;
  pathPicture: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  profiles: {
    userId: number;
    firstname: string;
    pathPicture: string;
    role: GroupUserRoleEnum[];
    status: GroupUserStatusEnum[];
  }[];
  stages?: {
    id: number;
    title: string;
    address: string;
    dateFrom: string;
    dateTo: string;
  }[];
}

export enum GroupStatusEnum {
  PENDING = "Pas encore débuté",
  IN_PROGRESS = "En cours",
  FINISHED = "Fini",
}
