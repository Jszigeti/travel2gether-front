// REACT HOOKS
import { useContext, useEffect, useState } from "react";

// REACT QUERY
import { useQuery } from "@tanstack/react-query";

// ROUTER
import { NavLink, useNavigate } from "react-router-dom";

// AXIOS FUNCTIONS
import { editProfile, getProfile } from "../../api/profile";

// FORMIK + YUP
import { useFormik } from "formik";
import { array, date, object, ref } from "yup";

// INTERFACES
import { ProfileInterface } from "../../interfaces/Profile";
import {
  BudgetEnum,
  LodgingsSet,
  ProfileTripDurationsSet,
  TravelTypesSet,
} from "../../interfaces/Matching";

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
import UserContext from "../../hooks/context/user.context";

// PROPS INTERFACE
interface ProfilePrefFormProps {
  profileData?: ProfileInterface;
  signupContext?: boolean;
  paramsId?: number;
}

export function ProfilePrefForm({
  profileData,
  signupContext = true,
  paramsId,
}: ProfilePrefFormProps) {
  // STATES
  const [error, setError] = useState<null | string>(null);

  // REDIRECTION
  const navigate = useNavigate();

  // RETRIEVE USER ID
  const { userId } = useContext(UserContext) || { paramsId };

  // RETRIEVE PROFIL PREF DATA
  const {
    data: profilePrefData,
    isLoading: isProfilePrefLoading,
    isError: isProfilePrefError,
  } = useQuery<ProfileInterface>({
    queryKey: ["profilePref", userId],
    queryFn: () => (userId ? getProfile(userId) : Promise.resolve({})),
    enabled: !signupContext,
  });

  // FORM LOGIC
  const formik = useFormik({
    initialValues: {
      travel_types: [] as TravelTypesSet[],
      budget: [] as BudgetEnum[],
      lodgings: [] as LodgingsSet[],
      available_from: "",
      available_to: "",
      trip_durations: [] as ProfileTripDurationsSet[],
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
      // FORM LOGIC IF SIGNUP CONTEXT
      if (profileData && userId) {
        const userProfileData = { ...profileData, ...values };
        try {
          setError(null);
          const response = await editProfile(userId, userProfileData);
          console.log(
            "Enregistrement des informations du profil réussi",
            response
          );
          navigate(`/`);
          formik.resetForm();
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Une erreur inconnue est survenue");
          }
          console.log(error);
        }
      } else if (userId && !signupContext) {
        // FORM LOGIC IF EDIT CONTEXT
        try {
          setError(null);
          const response = await editProfile(userId, values);
          console.log("Modification du profil réussie", response);
          navigate(`/my-profile/edit`);
          formik.resetForm();
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Une erreur inconnue est survenue");
          }
          console.log(error);
        }
      }
    },
  });

  useEffect(() => {
    if (profilePrefData) {
      formik.setValues({
        travel_types: profilePrefData.travel_types || [],
        budget: profilePrefData.budget || [],
        lodgings: profilePrefData.lodgings || [],
        available_from: profilePrefData.available_from || "",
        available_to: profilePrefData.available_to || "",
        trip_durations: profilePrefData.trip_durations || [],
      });
    }
  }, [profilePrefData]);

  return (
    <Card
      color="transparent"
      shadow={false}
      className="mt-6 mb-6 flex justify-center items-center text-black "
    >
      {signupContext && <h1 className="mb-6">Mes préférences</h1>}
      <form
        className="w-80 max-w-screen-lg sm:w-96"
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
        {isProfilePrefLoading && (
          <div className="text-blue text-center">Chargement des données...</div>
        )}
        {isProfilePrefError && (
          <div className="text-red-500 text-center">
            Erreur lors du chargement des données
          </div>
        )}
        {signupContext && (
          <Typography className="text-center font-normal  mt-6">
            <NavLink to="/" className="text-blue">
              Compléter plus tard
            </NavLink>
          </Typography>
        )}
      </form>
    </Card>
  );
}
