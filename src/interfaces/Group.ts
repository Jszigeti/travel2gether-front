import { BudgetEnum } from "./Budget";
import { LodgingsSet } from "./Lodgings";
import { SpokenLanguagesSet } from "./SpokenLanguages";
import { TravelTypesSet } from "./TravelTypes";

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

export enum GroupStatusEnum {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}

export enum GroupGenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
  MIXED = "MIXED",
}

export enum GroupAgeRangesSet {
  "18-25",
  "25-35",
  "35-50",
  "50+",
}
