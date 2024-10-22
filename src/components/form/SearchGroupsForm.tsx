import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ageRangesOptions,
  budgetOptions,
  groupGenderOptions,
  lodgingsOptions,
  spokenLanguagesOptions,
  travelTypesOptions,
} from "../../data/formOptions";
import Dropdown from "../UI/DropdownComponent";
import {
  TravelTypesSet,
  LodgingsSet,
  GroupGenderEnum,
  SpokenLanguagesSet,
  BudgetEnum,
  GroupAgeRangesSet,
} from "../../interfaces/Matching";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getGroups } from "../../api/group";
import { useNavigate } from "react-router-dom";

export default function SearchGroupsForm() {
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      travel_types: [] as TravelTypesSet[],
      lodgings: [] as LodgingsSet[],
      gender_type: [] as GroupGenderEnum[],
      spoken_languages: [] as SpokenLanguagesSet[],
      budget: [] as BudgetEnum[],
      age_ranges: [] as GroupAgeRangesSet[],
      location: "",
      date_from: "",
      date_to: "",
    },
    validationSchema: Yup.object({
      date_from: Yup.date()
        .nullable()
        .test(
          "date-from-required",
          "La date de début doit être renseignée si la date de fin est renseignée",
          (date_from, context) => {
            const date_to = context.parent.date_to;
            return !date_to || !!date_from;
          }
        ),
      date_to: Yup.date()
        .nullable()
        .test(
          "date-to-required",
          "La date de fin doit être renseignée si la date de début est renseignée",
          (date_to, context) => {
            const date_from = context.parent.date_from;
            return !date_from || !!date_to;
          }
        )
        .test(
          "is-valid-date-to",
          "La date de fin doit être supérieure ou égale à la date de début",
          (date_to, context) => {
            const date_from = context.parent.date_from;
            return (
              !date_from || !date_to || new Date(date_to) >= new Date(date_from)
            );
          }
        ),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        const response = await getGroups(values);
        console.log("Recherche des groupes", response);
        navigate(`/results`, { state: { groups: response } });
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Une erreur inconnue est survenue");
        }
        console.log(error);
      }
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
          <Typography variant="h6">Lieu</Typography>
          <Input
            crossOrigin={undefined}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            size="lg"
            placeholder="Lieu du groupe de voyage"
            className={`!border-blue ${
              formik.touched.location && formik.errors.location
                ? "!border-red-500"
                : null
            }`}
            {...formik.getFieldProps("location")}
          />

          <div className="flex flex-col mb-3 relative">
            <Typography variant="h6">Date de début</Typography>
            <Input
              crossOrigin={undefined}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              type="date"
              size="lg"
              placeholder="Date de début du groupe de voyage"
              className={`!border-blue ${
                formik.touched.date_from && formik.errors.date_from
                  ? "!border-red-500"
                  : null
              }`}
              {...formik.getFieldProps("date_from")}
            />
            {formik.touched.date_from && formik.errors.date_from ? (
              <>
                <Typography color="red">{formik.errors.date_from}</Typography>
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="absolute right-10 top-10 text-red-500"
                />
              </>
            ) : null}
          </div>

          <div className="flex flex-col relative">
            <Typography variant="h6">Date de fin</Typography>
            <Input
              crossOrigin={undefined}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              type="date"
              size="lg"
              placeholder="Date de fin du groupe de voyage"
              className={`!border-blue ${
                formik.touched.date_to && formik.errors.date_to
                  ? "!border-red-500"
                  : null
              }`}
              {...formik.getFieldProps("date_to")}
            />
            {formik.touched.date_to && formik.errors.date_to ? (
              <>
                <Typography color="red">{formik.errors.date_to}</Typography>
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="absolute right-10 top-10 text-red-500"
                />
              </>
            ) : null}
          </div>

          <Typography variant="h6" className="mt-1">
            Type de voyage
          </Typography>
          <Dropdown
            label="un type de voyage"
            options={travelTypesOptions}
            field={formik.getFieldProps("travel_types")}
            formik={formik}
          />

          {/* Hidden fields */}
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
      </form>
    </Card>
  );
}
