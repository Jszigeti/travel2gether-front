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
  userId?: number;
  firstname?: string;
  lastname?: string;
  birthdate?: string;
  gender?: ProfileGenderEnum[];
  file?: Blob;
  pathPicture?: string;
  description?: string;
  budget?: BudgetEnum[];
  travelTypes?: TravelTypesSet[];
  lodgings?: LodgingsSet[];
  interests?: ProfileInterestsSet[];
  availableFrom?: string;
  availableTo?: string;
  spokenLanguages?: SpokenLanguagesSet[];
  tripDurations?: ProfileTripDurationsSet[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProfilePageInterface {
  userId: number;
  firstname: string;
  lastname: string;
  birthdate: string;
  averageRating: number;
  ratings: number;
  gender: ProfileGenderEnum[];
  pathPicture: string;
  description: string;
  budget: BudgetEnum[];
  travelTypes: TravelTypesSet[];
  lodgings: LodgingsSet[];
  interests: ProfileInterestsSet[];
  availableFrom: string;
  availableTo: string;
  spokenLanguages: SpokenLanguagesSet[];
  tripDurations: ProfileTripDurationsSet[];
  groups: {
    id: number;
    title: string;
    pathPicture: string;
    location: string;
    dateFrom: string;
    dateTo: string;
  }[];
}

export interface AvatarCardInterface {
  userId: number;
  firstname: string;
  lastname: string;
  pathPicture: string;
}
