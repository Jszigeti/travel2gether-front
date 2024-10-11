import { BudgetEnum } from "./Budget";
import { LodgingsSet } from "./Lodgings";
import { SpokenLanguagesSet } from "./SpokenLanguages";
import { TravelTypesSet } from "./TravelTypes";

export interface ProfileInterface {
  user_id?: number;
  firstname?: string;
  lastname?: string;
  birthdate?: string;
  gender?: ProfileGenderEnum;
  path_picture?: string;
  description?: string;
  budget?: BudgetEnum;
  travel_types?: TravelTypesSet[];
  lodgings?: LodgingsSet[];
  interests?: ProfileInterestsSet[];
  available_from?: string;
  available_to?: string;
  spoken_languages?: SpokenLanguagesSet[];
  trip_durations?: ProfileTripDurationsSet[];
  created_at?: Date;
  updated_at?: Date;
}

export enum ProfileGenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum ProfileInterestsSet {
  ADVENTURE_SPORTS = "ADVENTURE_SPORTS",
  CULTURAL_ARTS = "CULTURAL_ARTS",
  GASTRONOMIC = "GASTRONOMIC",
  NATURE = "NATURE",
  WELLNESS = "WELLNESS",
  PARTY = "PARTY",
  AMUSEMENT_PARK = "AMUSEMENT_PARK",
  BOARD_GAMES = "BOARD_GAMES",
  TECHNOLOGIES = "TECHNOLOGIES",
  HISTORY = "HISTORY",
  WATER_ACTIVITIES = "WATER_ACTIVITIES",
  SHOPPING = "SHOPPING",
  FAMILY_ACTIVITIES = "FAMILY_ACTIVITIES",
}

export enum ProfileTripDurationsSet {
  SHORT_TRIP = "SHORT_TRIP",
  MEDIUM_TRIP = "MEDIUM_TRIP",
  LONG_TRIP = "LONG_TRIP",
}
