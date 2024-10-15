// REACT HOOKS
import { useState } from "react";

// ROUTER
import { NavLink } from "react-router-dom";

// AXIOS FUNCTIONS
import { editProfile } from "../../api/profile";

// FORMIK + YUP
import { useFormik } from "formik";
import { array, date, object, ref } from "yup";

// INTERFACES
import { ProfileInterface } from "../../interfaces/Profile";

// FORM DATA
import {
  budgetOptions,
  lodgingsOptions,
  travelTypesOptions,
  tripDurationsOptions,
} from "../../data/formOptions";

// COMPONENTS
import Dropdown from "../UI/DropdownComponent";
import { Button, Card, Typography, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

// PROPS INTERFACE
interface ProfileContFormProps {
  profileData?: ProfileInterface;
}

// FAKE USER
const userId = 1;

export function ProfileContForm({ profileData }: ProfileContFormProps) {
  // STATES
  const [error, setError] = useState<null | string>(null);

  // FORM LOGIC
  const formik = useFormik<ProfileInterface>({
    initialValues: {
      travel_types: [],
      budget: [],
      lodgings: [],
      available_from: "",
      available_to: "",
      trip_durations: [],
    },
    validationSchema: object({
      travel_types: array(),
      budget: array(),
      lodgings: array(),
      available_from: date(),
      available_to: date().min(
        ref("available_from"),
        "La date de fin doit être supérieure à la date de début"
      ),
      trip_durations: array(),
    }),
    onSubmit: async (values) => {
      if (profileData) {
        console.log({ ...profileData, ...values });
        const userProfileData = { ...profileData, ...values };
        try {
          setError(null);
          const response = await editProfile(userId, userProfileData);
          console.log(
            "Enregistrement des informations du profil réussi",
            response
          );
          formik.resetForm();
        } catch (error: unknown) {
          console.log(error);
          setError(error);
        }
      } else {
        try {
          setError(null);
          const response = await editProfile(userId, values);
          console.log("Modification du profil réussie", response);
          formik.resetForm();
        } catch (error: unknown) {
          console.log(error);
          setError(error);
        }
      }
    },
  });

  return (
    <Card
      color="transparent"
      shadow={false}
      className="flex justify-center items-center min-h-screen text-black "
    >
      <Typography variant="h4" className="font-montserrat">
        Mes préférences
      </Typography>
      <form
        className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Types de voyage</Typography>
          <Dropdown
            options={travelTypesOptions}
            field={formik.getFieldProps("travel_types")}
            formik={formik}
            label="vos types de voyage"
          />
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Mon budget</Typography>
          <Dropdown
            options={budgetOptions}
            field={formik.getFieldProps("budget")}
            formik={formik}
            label="votre budget"
            multiple={false}
          />
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Préférences d'hébergement</Typography>
          <Dropdown
            options={lodgingsOptions}
            field={formik.getFieldProps("lodgings")}
            formik={formik}
            label="vos préférences d'hébergement"
          />
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Mes disponibilités</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            type="date"
            placeholder="Début"
            className={`!border-blue mb-3  ${
              formik.touched.available_from && formik.errors.available_from
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={formik.handleChange}
            name="available_from"
            value={formik.values.available_from}
          />
          {formik.touched.available_from && formik.errors.available_from ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.available_from && formik.touched.available_from && (
            <div>{formik.errors.available_from}</div>
          )}
        </div>
        <div className="flex flex-col mb-3 relative">
          <Input
            crossOrigin={undefined}
            size="lg"
            type="date"
            placeholder="Fin"
            className={`!border-blue  ${
              formik.touched.available_to && formik.errors.available_to
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={formik.handleChange}
            name="available_to"
            value={formik.values.available_to}
          />
          {formik.touched.available_to && formik.errors.available_to ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.available_to && formik.touched.available_to && (
            <div>{formik.errors.available_to}</div>
          )}
        </div>
        <div className="flex flex-col mb-6 relative">
          <Typography variant="h6">Durées de voyage</Typography>
          <Dropdown
            options={tripDurationsOptions}
            field={formik.getFieldProps("trip_durations")}
            formik={formik}
            label="vos durées de voyage"
          />
        </div>
        <Button
          size="md"
          fullWidth
          className="bg-blue font-montserrat"
          type="submit"
        >
          Valider
        </Button>
        {error && (
          <div className="text-red-500 text-center ">
            Erreur lors de la mise à jour du profil
          </div>
        )}
        <Typography className="text-center font-normal  mt-6">
          <NavLink to="/" className="text-blue">
            Compléter plus tard
          </NavLink>
        </Typography>
      </form>
    </Card>
  );
}
