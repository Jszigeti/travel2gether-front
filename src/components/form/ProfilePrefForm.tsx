// REACT HOOKS
import { useEffect, useState } from "react";

// CONTEXT
import useAuthContext from "../../hooks/context/useAuthContext";

// REACT QUERY
import { useQuery, useQueryClient } from "@tanstack/react-query";

// ROUTER
import { useNavigate } from "react-router-dom";

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

// PROPS INTERFACE
interface ProfilePrefFormProps {
  signupContext?: boolean;
}

export function ProfilePrefForm({
  signupContext = true,
}: ProfilePrefFormProps) {
  // STATES
  const [error, setError] = useState<null | string>(null);

  // REDIRECTION
  const navigate = useNavigate();

  // RETRIEVE USER FROM CONTEXT
  const { user } = useAuthContext();

  // QUERY CLIENT DECLARATION
  const queryClient = useQueryClient();

  // RETRIEVE PROFIL PREF DATA
  const {
    data: profilePref,
    isLoading: isProfilePrefLoading,
    isError: isProfilePrefError,
  } = useQuery<ProfileInterface>({
    queryKey: ["profilePref", user?.userId],
    queryFn: () =>
      user
        ? getProfile(user.userId)
        : Promise.reject(new Error("User ID is required")),
    enabled: !signupContext,
  });

  // FORM LOGIC
  const formik = useFormik({
    initialValues: {
      travelTypes: [] as TravelTypesSet[],
      budget: [] as BudgetEnum[],
      lodgings: [] as LodgingsSet[],
      availableFrom: "",
      availableTo: "",
      tripDurations: [] as ProfileTripDurationsSet[],
    },
    validationSchema: object({
      travelTypes: array(),
      budget: array(),
      lodgings: array(),
      availableFrom: date(),
      availableTo: date().min(
        ref("availableFrom"),
        "La date de fin doit être supérieure à la date de début"
      ),
      tripDurations: array(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      if (values.availableFrom)
        formData.append("availableFrom", values.availableFrom);
      if (values.availableTo)
        formData.append("availableTo", values.availableTo);
      values.travelTypes?.forEach((travelType) =>
        formData.append("travelTypes[]", travelType)
      );
      values.budget?.forEach((budget) => formData.append("budget[]", budget));
      values.lodgings?.forEach((lodging) =>
        formData.append("lodgings[]", lodging)
      );
      values.tripDurations?.forEach((tripDuration) =>
        formData.append("tripDurations[]", tripDuration)
      );
      // FORM LOGIC IF SIGNUP CONTEXT
      if (signupContext) {
        try {
          setError(null);
          const response = await editProfile(formData);
          console.log(
            "Enregistrement des informations du profil réussi",
            response
          );
          formik.resetForm();
          navigate(`/signin`);
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Une erreur inconnue est survenue");
          }
          console.log(error);
        }
      } else {
        // FORM LOGIC IF EDIT CONTEXT
        try {
          setError(null);
          const response = await editProfile(formData);
          console.log("Modification du profil réussie", response);
          queryClient.setQueryData(["profilePref", user?.userId], values);
          queryClient.invalidateQueries({
            queryKey: ["profileData", user?.userId],
          });
          formik.resetForm();
          navigate(`/my-profile/edit`);
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
    if (profilePref) {
      formik.setValues({
        travelTypes: profilePref.travelTypes || [],
        budget: profilePref.budget || [],
        lodgings: profilePref.lodgings || [],
        availableFrom: profilePref.availableFrom || "",
        availableTo: profilePref.availableTo || "",
        tripDurations: profilePref.tripDurations || [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePref]);

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
            field={formik.getFieldProps("travelTypes")}
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
              formik.touched.availableFrom && formik.errors.availableFrom
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={formik.handleChange}
            name="availableFrom"
            value={formik.values.availableFrom}
          />
          {formik.touched.availableFrom && formik.errors.availableFrom ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.availableFrom && formik.touched.availableFrom && (
            <div>{formik.errors.availableFrom}</div>
          )}
        </div>
        <div className="flex flex-col mb-3 relative">
          <Input
            crossOrigin={undefined}
            size="lg"
            type="date"
            placeholder="Fin"
            className={`!border-blue  ${
              formik.touched.availableTo && formik.errors.availableTo
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={formik.handleChange}
            name="availableTo"
            value={formik.values.availableTo}
          />
          {formik.touched.availableTo && formik.errors.availableTo ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.availableTo && formik.touched.availableTo && (
            <div>{formik.errors.availableTo}</div>
          )}
        </div>
        <div className="flex flex-col mb-6 relative">
          <Typography variant="h6">Durées de voyage</Typography>
          <Dropdown
            options={tripDurationsOptions}
            field={formik.getFieldProps("tripDurations")}
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
          <Typography
            className="text-center text-blue font-normal mt-6 cursor-pointer"
            onClick={() => navigate(`/signin`)}
          >
            Compléter plus tard
          </Typography>
        )}
      </form>
    </Card>
  );
}
