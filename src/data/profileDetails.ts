import {
  BudgetEnum,
  LodgingsSet,
  ProfileGenderEnum,
  ProfileInterestsSet,
  ProfileTripDurationsSet,
  SpokenLanguagesSet,
  TravelTypesSet,
} from "../interfaces/Matching";

export const profileDetails = {
  user_id: 1,
  firstname: "Alice",
  lastname: "Smith",
  birthdate: "1983-06-11",
  average_rating: 4.3,
  ratings: 5,
  gender: ProfileGenderEnum.FEMALE,
  path_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
  description:
    "Hello, this is just a test profile. It'll be deleted once we get a proper back-end. In the meantime let's fill this box to test how it looks like, even if some will leave it empty.",
  budget: BudgetEnum.MIDDLE,
  travel_types: [TravelTypesSet.CRUISE, TravelTypesSet.CULTURAL],
  lodgings: [LodgingsSet.CAMPING, LodgingsSet.HOTEL],
  interests: [
    ProfileInterestsSet.HISTORY,
    ProfileInterestsSet.PARTY,
    ProfileInterestsSet.BOARD_GAMES,
  ],
  available_from: "2024-11-02",
  available_to: "2024-11-06",
  spoken_languages: [SpokenLanguagesSet.ENGLISH],
  trip_durations: [
    ProfileTripDurationsSet.LONG_TRIP,
    ProfileTripDurationsSet.MEDIUM_TRIP,
  ],
  groups: [
    {
      id: 1,
      title: "Voyage en Normandie",
      path_picture:
        "https://normandieparticipations.fr/app/uploads/2022/11/alix-guerin-nWxUOY7bAaY-unsplash-1920x835-1-1920x835.jpg",
      location: "Caen",
      date_from: "2024-10-25",
      date_to: "2024-10-31",
    },
    {
      id: 2,
      title: "Voyage à Paris",
      path_picture:
        "https://r-xx.bstatic.com/xdata/images/city/608x352/977239.webp?k=c2409c69613bc168e54e0c4930e1436a0f378d7fe40d9c94f4a03595e0f423a8&o=",
      location: "Paris",
      date_from: "2024-10-25",
      date_to: "2024-10-31",
    },
    {
      id: 3,
      title: "Voyage à Paris",
      path_picture:
        "https://r-xx.bstatic.com/xdata/images/city/608x352/977239.webp?k=c2409c69613bc168e54e0c4930e1436a0f378d7fe40d9c94f4a03595e0f423a8&o=",
      location: "Paris",
      date_from: "2024-10-25",
      date_to: "2024-10-31",
    },
    {
      id: 4,
      title: "Voyage à Paris",
      path_picture:
        "https://r-xx.bstatic.com/xdata/images/city/608x352/977239.webp?k=c2409c69613bc168e54e0c4930e1436a0f378d7fe40d9c94f4a03595e0f423a8&o=",
      location: "Paris",
      date_from: "2024-10-25",
      date_to: "2024-10-31",
    },
  ],
};
