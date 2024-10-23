// INTERFACES
import {
  ProfileGenderEnum,
  BudgetEnum,
  TravelTypesSet,
  LodgingsSet,
  ProfileInterestsSet,
  SpokenLanguagesSet,
  ProfileTripDurationsSet,
} from "./Matching";

export interface ProfileInterface {
  user_id?: number;
  firstname?: string;
  lastname?: string;
  birthdate?: string;
  gender?: ProfileGenderEnum[];
  path_picture?: string;
  description?: string;
  budget?: BudgetEnum[];
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

export interface ProfilePageInterface {
  user_id: number;
  firstname: string;
  lastname: string;
  birthdate: string;
  average_rating: number;
  ratings: number;
  gender: ProfileGenderEnum[];
  path_picture: string;
  description: string;
  budget: BudgetEnum[];
  travel_types: TravelTypesSet[];
  lodgings: LodgingsSet[];
  interests: ProfileInterestsSet[];
  available_from: string;
  available_to: string;
  spoken_languages: SpokenLanguagesSet[];
  trip_durations: ProfileTripDurationsSet[];
  groups: {
    id: number;
    title: string;
    path_picture: string;
    location: string;
    date_from: string;
    date_to: string;
  }[];
}

export interface AvatarCardInterface {
  user_id: number;
  firstname: string;
  path_picture: string;
}
