import {
  GroupUserRoleEnum,
  GroupUserStatusEnum,
} from "../interfaces/GroupUser";
import {
  BudgetEnum,
  GroupAgeRangesSet,
  GroupGenderEnum,
  LodgingsSet,
  SpokenLanguagesSet,
  TravelTypesSet,
} from "../interfaces/Matching";

export const groupDetails = {
  title: "Voyage à Bordeaux",
  description:
    "Lorem ipsum dolor sit amet consectetur. Sagittis nunc nam vitae quam ut sodales cursus mi semper. In ipsum sagittis nunc vitae id integer. Mattis id velit dui maecenas sed condimentum enim non. Id ut tempor urna turpis ac donec. Nibh sit nibh aliquam enim quam. Vel nullam.",
  location: "Bordeaux, France",
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
  profiles: [
    {
      user_id: 111,
      firstname: "Marie",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [GroupUserRoleEnum.AUTHOR],
      status: [GroupUserStatusEnum.ACCEPTED],
    },
    {
      user_id: 1,
      firstname: "Marie",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [GroupUserRoleEnum.ORGANIZER],
      status: [GroupUserStatusEnum.DENIED],
    },
    {
      user_id: 3,
      firstname: "Marie",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [GroupUserRoleEnum.TRAVELER],
      status: [GroupUserStatusEnum.ACCEPTED],
    },
    {
      user_id: 4,
      firstname: "Marie",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [GroupUserRoleEnum.TRAVELER],
      status: [GroupUserStatusEnum.ACCEPTED],
    },
    {
      user_id: 5,
      firstname: "Marie",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [GroupUserRoleEnum.TRAVELER],
      status: [GroupUserStatusEnum.ACCEPTED],
    },
    {
      user_id: 6,
      firstname: "Marie",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [GroupUserRoleEnum.TRAVELER],
      status: [GroupUserStatusEnum.ACCEPTED],
    },
    {
      user_id: 7,
      firstname: "Marie dsdsd sd sd ",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [GroupUserRoleEnum.TRAVELER],
      status: [GroupUserStatusEnum.ACCEPTED],
    },
    {
      user_id: 8,
      firstname: "Marie",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [GroupUserRoleEnum.TRAVELER],
      status: [GroupUserStatusEnum.ACCEPTED],
    },
    {
      user_id: 9,
      firstname: "Mari edsd sd ",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [GroupUserRoleEnum.TRAVELER],
      status: [GroupUserStatusEnum.ACCEPTED],
    },
    {
      user_id: 10,
      firstname: "Marie",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [GroupUserRoleEnum.TRAVELER],
      status: [GroupUserStatusEnum.ACCEPTED],
    },
    {
      user_id: 11,
      firstname: "Marie",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [GroupUserRoleEnum.TRAVELER],
      status: [GroupUserStatusEnum.ACCEPTED],
    },
    {
      user_id: 12,
      firstname: "Marie Bla bla bla",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [GroupUserRoleEnum.TRAVELER],
      status: [GroupUserStatusEnum.ACCEPTED],
    },
    {
      user_id: 13,
      firstname: "Marie Bla bla bla",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [],
      status: [GroupUserStatusEnum.PENDING],
    },
    {
      user_id: 14,
      firstname: "Marie Bla bla bla",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [],
      status: [GroupUserStatusEnum.PENDING],
    },
    {
      user_id: 15,
      firstname: "Marie Bla bla bla",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [],
      status: [GroupUserStatusEnum.PENDING],
    },
    {
      user_id: 16,
      firstname: "Marie Bla bla bla",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [],
      status: [GroupUserStatusEnum.PENDING],
    },
    {
      user_id: 17,
      firstname: "Marie Bla bla bla",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [],
      status: [GroupUserStatusEnum.DENIED],
    },
    {
      user_id: 18,
      firstname: "Marie Bla bla bla",
      path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: [],
      status: [GroupUserStatusEnum.DENIED],
    },
  ],
  stages: [
    {
      id: 1,
      title: "Cité du vin",
      address: "Bordeaux",
      date_from: "2024-10-17",
      date_to: "2024-10-17",
    },
    {
      id: 2,
      title: "Cité du vin",
      address: "Bordeaux",
      date_from: "2024-10-17",
      date_to: "2024-10-17",
    },
  ],
};
