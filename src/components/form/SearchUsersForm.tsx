import { useState } from "react";
import { useFormik } from "formik";
import {
  ageRangesOptions,
  budgetOptions,
  groupGenderOptions,
  interestsOptions,
  lodgingsOptions,
  spokenLanguagesOptions,
  travelTypesOptions,
  tripDurationsOptions,
} from "../../data/formOptions";
import Dropdown from "../UI/DropdownComponent";
import {
  TravelTypesSet,
  LodgingsSet,
  GroupGenderEnum,
  SpokenLanguagesSet,
  BudgetEnum,
  GroupAgeRangesSet,
  ProfileTripDurationsSet,
  ProfileInterestsSet,
} from "../../interfaces/Matching";
import { Button, Card, Typography } from "@material-tailwind/react";
// import { getProfiles } from "../../api/profile";
// import { useNavigate } from "react-router-dom";

export default function SearchUsersForm() {
  const [showMore, setShowMore] = useState(false);
  // const [error, setError] = useState<null | string>(null);
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      travel_types: [] as TravelTypesSet[],
      lodgings: [] as LodgingsSet[],
      gender_type: [] as GroupGenderEnum[],
      spoken_languages: [] as SpokenLanguagesSet[],
      budget: [] as BudgetEnum[],
      age_ranges: [] as GroupAgeRangesSet[],
      trip_durations: [] as ProfileTripDurationsSet[],
      interests: [] as ProfileInterestsSet[],
    },
    onSubmit: async (values) => {
      console.log("🚀 ~ onSubmit: ~ values:", values);
      // try {
      //   const response = await getProfiles(values);
      //   console.log("Recherche des utilisateurs", response);
      //   navigate(`/results`, { state: { profiles: response } });
      // } catch (error: unknown) {
      //   if (error instanceof Error) {
      //     setError(error.message);
      //   } else {
      //     setError("Une erreur inconnue est survenue");
      //   }
      //   console.log(error);
      // }
    },
  });

  return (
    <Card
      shadow={false}
      className="flex justify-center items-center text-black"
    >
      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 mb-6 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-2">
          <Typography variant="h6" className="mt-1">
            Type de voyage
          </Typography>
          <Dropdown
            label="un type de voyage"
            options={travelTypesOptions}
            field={formik.getFieldProps("travel_types")}
            formik={formik}
          />

          <Typography variant="h6">Centres d'intérêt</Typography>
          <Dropdown
            options={interestsOptions}
            field={formik.getFieldProps("interests")}
            formik={formik}
            label="vos centres d'intérêt"
          />

          <Typography variant="h6">Durées de voyage</Typography>
          <Dropdown
            options={tripDurationsOptions}
            field={formik.getFieldProps("trip_durations")}
            formik={formik}
            label="vos durées de voyage"
          />

          {/* Hidden fields  */}
          {showMore && (
            <>
              <Typography variant="h6" className="mt-4">
                Hébergement
              </Typography>
              <Dropdown
                label="un type d'hébergement"
                options={lodgingsOptions}
                field={formik.getFieldProps("lodgings")}
                formik={formik}
              />

              <Typography variant="h6" className="mt-4">
                Budget
              </Typography>
              <Dropdown
                label="un budget"
                multiple={false}
                options={budgetOptions}
                field={formik.getFieldProps("budget")}
                formik={formik}
              />

              <Typography variant="h6" className="mt-4">
                Langues parlées
              </Typography>
              <Dropdown
                label="une langue"
                options={spokenLanguagesOptions}
                field={formik.getFieldProps("spoken_languages")}
                formik={formik}
              />

              <Typography variant="h6" className="mt-4">
                Tranche d'âge
              </Typography>
              <Dropdown
                label="une tranche d'âge"
                options={ageRangesOptions}
                field={formik.getFieldProps("age_ranges")}
                formik={formik}
              />

              <Typography variant="h6" className="mt-4">
                Genre
              </Typography>
              <Dropdown
                multiple={false}
                label="un genre"
                options={groupGenderOptions}
                field={formik.getFieldProps("gender_type")}
                formik={formik}
              />
            </>
          )}
        </div>

        {/* Hide/show more fields */}
        <Button
          type="button"
          onClick={() => setShowMore(!showMore)}
          className="font-montserrat font-bold mt-4 bg-gray-500 text-white"
          fullWidth
        >
          {showMore
            ? "Afficher moins de critères"
            : "Afficher plus de critères"}
        </Button>

        {/* Search button */}
        <Button
          className="font-montserrat font-bold mt-6 bg-blue text-white"
          fullWidth
          type="submit"
        >
          Rechercher
        </Button>

        {/* Reset fields button */}
        <Button
          type="button"
          onClick={() => formik.resetForm()}
          className="font-montserrat font-bold mt-4 bg-red-500 text-white"
          fullWidth
        >
          Effacer tout
        </Button>
        {/* {error && (
          <div className="text-red-500 text-center ">
            Erreur lors de la recherche
          </div>
        )} */}
      </form>
    </Card>
  );
}
