import {
  BudgetEnum,
  GroupAgeRangesSet,
  GroupGenderEnum,
  LodgingsSet,
  SpokenLanguagesSet,
  TravelTypesSet,
} from "../interfaces/Matching";

export const groupDetails = {
  title: "Nom du groupe",
  description: "Description",
  location: "Lieu",
  date_from: "2020-10-10",
  date_to: "2020-10-20",
  path_picture:
    "https://www.visiter-bordeaux.eu/wp-content/uploads/2021/12/312d60be4eb0a318532654c7d7b023b1.jpeg",
  id: 1,
  travel_types: [TravelTypesSet.ADVENTURE, TravelTypesSet.BEACH],
  lodgings: [LodgingsSet.AIRBNB, LodgingsSet.CAMPING],
  gender_type: [GroupGenderEnum.MIXED],
  spoken_languages: [SpokenLanguagesSet.FRENCH, SpokenLanguagesSet.ENGLISH],
  budget: [BudgetEnum.MIDDLE],
  age_ranges: [
    GroupAgeRangesSet.FOURTH_AGE_RANGE,
    GroupAgeRangesSet.THIRD_AGE_RANGE,
  ],
};
