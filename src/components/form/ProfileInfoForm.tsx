// REACT HOOKS
import { useEffect, useState } from "react";

// CONTEXT
import useAuthContext from "../../hooks/context/useAuthContext";

// REACT QUERY
import { useQuery, useQueryClient } from "@tanstack/react-query";

// ROUTER
import { useNavigate } from "react-router-dom";

// AXIOS FUNCTIONS
import { useProfileApi } from "../../api/profile";

// FORMIK
import { useFormik } from "formik";
import { object, array, string, date } from "yup";

// INTERFACES
import { ProfileInterface } from "../../interfaces/Profile";
import {
  ProfileGenderEnum,
  ProfileInterestsSet,
  SpokenLanguagesSet,
} from "../../interfaces/Matching";

// FORM DATA
import {
  interestsOptions,
  profileGenderOptions,
  spokenLanguagesOptions,
} from "../../data/formOptions";

// COMPONENTS
import Dropdown from "../UI/DropdownComponent";
import {
  Button,
  Card,
  Textarea,
  Typography,
  Input,
  Avatar,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

// PROPS INTERFACE
interface ProfileInfoFormProps {
  onNext?: () => void;
  signupContext?: boolean;
}

export function ProfileInfoForm({
  onNext,
  signupContext = true,
}: ProfileInfoFormProps) {
  // AXIOS FUNCTION
  const { editProfile, getProfile } = useProfileApi();
  // STATES
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // RETRIEVE USER FROM CONTEXT
  const { user, setAuthInfos } = useAuthContext();

  // REDIRECTION
  const navigate = useNavigate();

  // QUERY CLIENT DECLARATION
  const queryClient = useQueryClient();

  // RETRIEVE PROFIL INFO DATA
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

  // DEFAULT AVATAR
  const defaultImage = profileInfo?.pathPicture
    ? `${import.meta.env.VITE_API_BASE_URL}${profileInfo.pathPicture}`
    : "https://images-ext-1.discordapp.net/external/vj4B_0At5aHV02oJ7BEdIZ2gOKfDu1FphkjY5ojkEko/%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3Dt2RnIzl7hAwIUoupTgTDTYPZ2HCLvw5y-umBEtBsk8g%3D/https/media.istockphoto.com/id/846183008/fr/vectoriel/ic%25C3%25B4ne-de-profil-avatar-par-d%25C3%25A9faut-espace-r%25C3%25A9serv%25C3%25A9-photo-gris.jpg?format=webp";

  // IMAGE FUNCTION
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("🚀 ~ handleImageChange ~ file:", file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      formik.setFieldValue("file", file);
    } else {
      setPreviewImage(null);
      formik.setFieldValue("file", null);
    }
  };

  // FORM LOGIC
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

  return (
    <Card
      color="transparent"
      shadow={false}
      className="mt-6 mb-6 flex justify-center items-center text-black "
    >
      {signupContext && <h1 className="mb-6">Mon profil</h1>}
      <form
        className="w-80 max-w-screen-lg sm:w-96"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col mb-3 relative">
          {previewImage ? (
            <Avatar
              src={previewImage}
              alt="Aperçu de l'image"
              className="w-[110px] h-[110px] object-cover mx-auto mb-3"
            />
          ) : (
            <Avatar
              src={defaultImage}
              alt="Aperçu de l'image"
              className="w-[110px] h-[110px] object-cover mx-auto mb-3"
            />
          )}
          <Input
            crossOrigin={undefined}
            size="lg"
            type="file"
            placeholder="Your profile pic"
            className={`!border-blue  ${
              formik.touched.file && formik.errors.file
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleImageChange}
            name="file"
          />
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Mon genre</Typography>
          <Dropdown
            options={profileGenderOptions}
            field={formik.getFieldProps("gender")}
            formik={formik}
            label="votre genre"
            multiple={false}
          />
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Ma date de naissance</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            type="date"
            placeholder="Date de naissance"
            className={`!border-blue mb-3  ${
              formik.touched.birthdate && formik.errors.birthdate
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={formik.handleChange}
            name="birthdate"
            value={formik.values.birthdate}
          />
          {formik.touched.birthdate && formik.errors.birthdate ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.birthdate && formik.touched.birthdate && (
            <div>{formik.errors.birthdate}</div>
          )}
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Bio</Typography>
          <Textarea
            placeholder="Parlez nous de vous!"
            name="description"
            size="lg"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="!border-blue"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Centres d'intérêt</Typography>
          <Dropdown
            options={interestsOptions}
            field={formik.getFieldProps("interests")}
            formik={formik}
            label="vos centres d'intérêt"
          />
        </div>
        <div className="flex flex-col mb-6 relative">
          <Typography variant="h6">Langues parlées</Typography>
          <Dropdown
            options={spokenLanguagesOptions}
            field={formik.getFieldProps("spokenLanguages")}
            formik={formik}
            label="vos langues parlées"
          />
        </div>
        <Button
          size="md"
          fullWidth
          className="bg-blue font-montserrat"
          type="submit"
        >
          {signupContext ? "Suite" : "Valider"}
        </Button>
        {isProfileInfoLoading && (
          <div className="text-blue text-center">Chargement des données...</div>
        )}
        {isProfileInfoError && (
          <div className="text-red-500 text-center">
            Erreur lors du chargement des données
          </div>
        )}
        {signupContext && (
          <Typography
            className="text-center text-blue font-normal mt-6 cursor-pointer"
            onClick={() => {
              navigate(`/signin`);
              toast.success(
                "Compte créé avec succès, merci de valider votre compte !"
              );
            }}
          >
            Compléter plus tard
          </Typography>
        )}
      </form>
    </Card>
  );
}
