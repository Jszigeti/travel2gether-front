import {
  BudgetEnum,
  GroupAgeRangesSet,
  GroupGenderEnum,
  LodgingsSet,
  ProfileGenderEnum,
  ProfileInterestsSet,
  ProfileTripDurationsSet,
  SpokenLanguagesSet,
  TravelTypesSet,
} from "../interfaces/Matching";

export const travelTypesOptions = [
  { value: TravelTypesSet.ADVENTURE, label: "Aventure" },
  { value: TravelTypesSet.CULTURAL, label: "Culturel" },
  { value: TravelTypesSet.RELAXATION, label: "Détente" },
  { value: TravelTypesSet.HIKING, label: "Randonnée" },
  { value: TravelTypesSet.BEACH, label: "Plage" },
  { value: TravelTypesSet.ROAD_TRIP, label: "Road Trip" },
  { value: TravelTypesSet.CRUISE, label: "Croisière" },
  { value: TravelTypesSet.FAMILY_TRIP, label: "Famililale" },
  { value: TravelTypesSet.GASTRONOMIC, label: "Gastronomique" },
  { value: TravelTypesSet.FRIENDS_TRIP, label: "Voyage entre ami(e)s" },
  { value: TravelTypesSet.ECO_FRIENDLY, label: "Écologique" },
];

export const interestsOptions = [
  { value: ProfileInterestsSet.ADVENTURE_SPORTS, label: "Sport/aventure" },
  { value: ProfileInterestsSet.CULTURAL_ARTS, label: "Art/culture" },
  { value: ProfileInterestsSet.GASTRONOMIC, label: "Gastronomique" },
  { value: ProfileInterestsSet.NATURE, label: "Nature" },
  { value: ProfileInterestsSet.WELLNESS, label: "Bien-être" },
  { value: ProfileInterestsSet.PARTY, label: "Festif" },
  { value: ProfileInterestsSet.AMUSEMENT_PARK, label: "Parcs d'attractions" },
  { value: ProfileInterestsSet.BOARD_GAMES, label: "Jeux de société" },
  { value: ProfileInterestsSet.TECHNOLOGIES, label: "Technologies" },
  { value: ProfileInterestsSet.HISTORY, label: "Histoire" },
  {
    value: ProfileInterestsSet.WATER_ACTIVITIES,
    label: "Activités aquatiques",
  },
  { value: ProfileInterestsSet.SHOPPING, label: "Shopping" },
  {
    value: ProfileInterestsSet.FAMILY_ACTIVITIES,
    label: "Activités familiales",
  },
];

export const tripDurationsOptions = [
  {
    value: ProfileTripDurationsSet.SHORT_TRIP,
    label: "Court (moins de 3 jours)",
  },
  { value: ProfileTripDurationsSet.MEDIUM_TRIP, label: "Moyen (3 à 7 jours)" },
  { value: ProfileTripDurationsSet.LONG_TRIP, label: "Long (plus de 7 jours)" },
];

export const lodgingsOptions = [
  { value: LodgingsSet.YOUTH_HOTEL, label: "Auberge" },
  { value: LodgingsSet.HOTEL, label: "Hotel" },
  { value: LodgingsSet.AIRBNB, label: "AirBnb" },
  { value: LodgingsSet.CAMPING, label: "Camping" },
  { value: LodgingsSet.ECOLODGE, label: "Eco logement" },
  { value: LodgingsSet.LUXURY, label: "Luxueux" },
];

export const groupGenderOptions = [
  { value: GroupGenderEnum.MALE, label: "Masculin" },
  { value: GroupGenderEnum.FEMALE, label: "Féminin" },
  { value: GroupGenderEnum.OTHER, label: "Autre" },
  { value: GroupGenderEnum.MIXED, label: "Mixte" },
];

export const profileGenderOptions = [
  { value: ProfileGenderEnum.MALE, label: "Masculin" },
  { value: ProfileGenderEnum.FEMALE, label: "Féminin" },
  { value: ProfileGenderEnum.OTHER, label: "Autre" },
];

export const spokenLanguagesOptions = [
  { value: SpokenLanguagesSet.FRENCH, label: "Français" },
  { value: SpokenLanguagesSet.ENGLISH, label: "Anglais" },
  { value: SpokenLanguagesSet.SPANISH, label: "Espagnol" },
  { value: SpokenLanguagesSet.PORTUGUESE, label: "Portugais" },
  { value: SpokenLanguagesSet.ARABIC, label: "Arabe" },
  { value: SpokenLanguagesSet.ITALIAN, label: "Italien" },
  { value: SpokenLanguagesSet.JAPANESE, label: "Japonais" },
  { value: SpokenLanguagesSet.MANDARIN, label: "Mandarin" },
  { value: SpokenLanguagesSet.GREEK, label: "Grec" },
  { value: SpokenLanguagesSet.DEUTSCH, label: "Allemand" },
  { value: SpokenLanguagesSet.DUTCH, label: "Hollandais" },
  { value: SpokenLanguagesSet.RUSSIAN, label: "Russe" },
  { value: SpokenLanguagesSet.HINDI, label: "Hindi" },
];

export const budgetOptions = [
  { value: BudgetEnum.LOW, label: "Bas" },
  { value: BudgetEnum.MIDDLE, label: "Moyen" },
  { value: BudgetEnum.HIGH, label: "Haut" },
  { value: BudgetEnum.LUXURY, label: "Luxe" },
];

export const ageRangesOptions = [
  { value: GroupAgeRangesSet.FIRST_AGE_RANGE, label: "18-25" },
  { value: GroupAgeRangesSet.SECOND_AGE_RANGE, label: "25-35" },
  { value: GroupAgeRangesSet.THIRD_AGE_RANGE, label: "35-50" },
  { value: GroupAgeRangesSet.FOURTH_AGE_RANGE, label: "50+" },
];
