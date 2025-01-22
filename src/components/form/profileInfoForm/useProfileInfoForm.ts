import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, array, string, date } from "yup";
import { useProfileApi } from "../../../api/profile";
import useAuthContext from "../../../hooks/context/useAuthContext";
import {
  ProfileGenderEnum,
  ProfileInterestsSet,
  SpokenLanguagesSet,
} from "../../../interfaces/Matching";
import { ProfileInterface } from "../../../interfaces/Profile";

// Props interface
interface IUseProfileInfoFormProps {
  onNext?: () => void;
  signupContext?: boolean;
}

const useProfileInfoForm = ({
  onNext,
  signupContext = true,
}: IUseProfileInfoFormProps) => {
  // Axios functions
  const { editProfile, getProfile } = useProfileApi();

  // Retrieve user and setter from context
  const { user, setAuthInfos } = useAuthContext();

  // Redirection
  const navigate = useNavigate();

  // Query client declaration
  const queryClient = useQueryClient();

  // Retrieve profile info data
  const {
    data: profileInfo,
    isLoading: isProfileInfoLoading,
    isError: isProfileInfoError,
  } = useQuery<ProfileInterface>({
    queryKey: ["profileInfo", user?.id],
    queryFn: () =>
      user
        ? getProfile(user.id)
        : Promise.reject(new Error("User ID is required")),
    enabled: !signupContext,
  });

  // Form logic
  const formik = useFormik<ProfileInterface>({
    initialValues: {
      file: undefined,
      gender: [] as ProfileGenderEnum[],
      description: "",
      birthdate: "",
      interests: [] as ProfileInterestsSet[],
      spokenLanguages: [] as SpokenLanguagesSet[],
    },
    validationSchema: object({
      gender: array(),
      description: string(),
      birthdate: date(),
      interests: array(),
      spokenLanguages: array(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      if (values.file) formData.append("file", values.file);
      if (values.description)
        formData.append("description", values.description);
      if (values.birthdate) formData.append("birthdate", values.birthdate);
      values.gender?.forEach((gender) => formData.append("gender[]", gender));
      values.interests?.forEach((interest) =>
        formData.append("interests[]", interest)
      );
      values.spokenLanguages?.forEach((language) =>
        formData.append("spokenLanguages[]", language)
      );
      if (onNext) {
        await editProfile(formData);
        onNext();
        formik.resetForm();
      } else if (user) {
        try {
          const response = await editProfile(formData);
          queryClient.setQueryData(["profileInfo", user.id], response);
          queryClient.invalidateQueries({
            queryKey: ["profileData", user.id],
          });
          setAuthInfos({ ...user, pathPicture: response.pathPicture });
          navigate(`/my-profile/edit`);
          toast.success("Profil modifié avec succès !");
          formik.resetForm();
        } catch (error: unknown) {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        }
      }
    },
  });

  useEffect(() => {
    if (profileInfo) {
      formik.setValues({
        pathPicture: profileInfo.pathPicture || "",
        gender: profileInfo.gender || [],
        birthdate: profileInfo.birthdate || "",
        description: profileInfo.description || "",
        interests: profileInfo.interests || [],
        spokenLanguages: profileInfo.spokenLanguages || [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileInfo]);

  return {
    formik,
    profileInfo,
    isProfileInfoLoading,
    isProfileInfoError,
  };
};

export default useProfileInfoForm;
