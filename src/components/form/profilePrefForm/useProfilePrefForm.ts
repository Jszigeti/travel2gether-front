import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, array, date, ref } from "yup";
import { useProfileApi } from "../../../api/profile";
import useAuthContext from "../../../hooks/context/useAuthContext";
import {
  TravelTypesSet,
  BudgetEnum,
  LodgingsSet,
  ProfileTripDurationsSet,
} from "../../../interfaces/Matching";
import { ProfileInterface } from "../../../interfaces/Profile";

// Props interface
interface IUseProfilePrefFormProps {
  signupContext?: boolean;
}

const useProfilePrefForm = ({ signupContext }: IUseProfilePrefFormProps) => {
  // Axios functions
  const { editProfile, getProfile } = useProfileApi();

  // Redirection
  const navigate = useNavigate();

  // Retrieve user from context
  const { user } = useAuthContext();

  // Query client declaration
  const queryClient = useQueryClient();

  // Retrieve profil pref data
  const {
    data: profilePref,
    isLoading: isProfilePrefLoading,
    isError: isProfilePrefError,
  } = useQuery<ProfileInterface>({
    queryKey: ["profilePref", user?.id],
    queryFn: () =>
      user
        ? getProfile(user.id)
        : Promise.reject(new Error("User ID is required")),
    enabled: !signupContext,
  });

  // Form logic
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
      if (signupContext) {
        try {
          const response = await editProfile(formData);
          console.log(
            "Enregistrement des informations du profil réussi",
            response
          );
          formik.resetForm();
          navigate(`/signin`);
          toast.success(
            "Profil complété avec succès, merci de valider votre compte !"
          );
        } catch (error: unknown) {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        }
      } else {
        try {
          const response = await editProfile(formData);
          console.log("Modification du profil réussie", response);
          queryClient.setQueryData(["profilePref", user?.id], values);
          queryClient.invalidateQueries({
            queryKey: ["profileData", user?.id],
          });
          formik.resetForm();
          navigate(`/my-profile/edit`);
          toast.success("Profil modifié avec succès !");
        } catch (error: unknown) {
          if (error instanceof Error) {
            toast.error(error.message);
          }
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

  return {
    formik,
    isProfilePrefLoading,
    isProfilePrefError,
  };
};

export default useProfilePrefForm;
