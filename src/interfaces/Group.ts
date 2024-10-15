// INTERFACES
import { GroupUserRoleEnum } from "./GroupUser";
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
  date_from?: string;
  date_to?: string;
  path_picture?: string;
  status?: GroupStatusEnum;
  travel_types?: TravelTypesSet[];
  lodgings?: LodgingsSet[];
  gender_type?: GroupGenderEnum;
  spoken_languages?: SpokenLanguagesSet[];
  budget?: BudgetEnum;
  age_ranges: GroupAgeRangesSet[];
  created_at?: Date;
  updated_at?: Date;
}

export interface GroupCardInterface {
  id: number;
  title?: string;
  path_picture: string;
  location?: string;
  date_from?: string;
  date_to?: string;
  profiles?: {
    user_id: number;
    path_picture: string;
    role: GroupUserRoleEnum;
  }[];
}

export enum GroupStatusEnum {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}
