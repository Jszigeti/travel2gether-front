// REACT HOOKS
import { useContext, useEffect, useState } from "react";

// REACT QUERY
import { useQuery } from "@tanstack/react-query";

// ROUTER
import { NavLink, useNavigate } from "react-router-dom";

// AXIOS FUNCTIONS
import { editProfile, getProfile } from "../../api/profile";

// FORMIK
import { useFormik } from "formik";
import { object, array, string } from "yup";

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
import UserContext from "../../hooks/context/user.context";

// PROPS INTERFACE
interface ProfileInfoFormProps {
  onNext?: () => void;
  onProfileData?: (values: ProfileInterface) => void;
  signupContext?: boolean;
  userId?: number;
}

export function ProfileInfoForm({
  onNext,
  onProfileData,
  signupContext = true,
}: ProfileInfoFormProps) {
  // STATES
  const [error, setError] = useState<null | string>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // REDIRECTION
  const navigate = useNavigate();

  // RETRIEVE USER ID
  const { userId } = useContext(UserContext) || {};

  // RETRIEVE PROFIL INFO DATA
  const {
    data: profileInfoData,
    isLoading: isProfileInfoLoading,
    isError: isProfileInfoError,
  } = useQuery<ProfileInterface>({
    queryKey: ["profileInfo", userId],
    queryFn: () => (userId ? getProfile(userId) : Promise.resolve({})),
    enabled: !signupContext,
  });

  // DEFAULT AVATAR
  const defaultImage = profileInfoData?.path_picture
    ? profileInfoData.path_picture
    : "https://images-ext-1.discordapp.net/external/vj4B_0At5aHV02oJ7BEdIZ2gOKfDu1FphkjY5ojkEko/%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3Dt2RnIzl7hAwIUoupTgTDTYPZ2HCLvw5y-umBEtBsk8g%3D/https/media.istockphoto.com/id/846183008/fr/vectoriel/ic%25C3%25B4ne-de-profil-avatar-par-d%25C3%25A9faut-espace-r%25C3%25A9serv%25C3%25A9-photo-gris.jpg?format=webp";

  // IMAGE FUNCTION
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      formik.setFieldValue("path_picture", file);
    } else {
      setPreviewImage(null);
      formik.setFieldValue("path_picture", null);
    }
  };

  // FORM LOGIC
  const formik = useFormik<ProfileInterface>({
    initialValues: {
      path_picture: "",
      gender: [] as ProfileGenderEnum[],
      description: "",
      interests: [] as ProfileInterestsSet[],
      spoken_languages: [] as SpokenLanguagesSet[],
    },
    validationSchema: object({
      path_picture: string(),
      gender: array(),
      description: string(),
      interests: array(),
      spoken_languages: array(),
    }),
    onSubmit: async (values) => {
      if (onProfileData && onNext) {
        onProfileData(values);
        onNext();
        formik.resetForm();
      } else if (userId) {
        try {
          setError(null);
          const response = await editProfile(userId, values);
          console.log("Mise à jour du profil réussie", response);
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
    if (profileInfoData) {
      formik.setValues({
        path_picture: profileInfoData.path_picture || "",
        gender: profileInfoData.gender || [],
        description: profileInfoData.description || "",
        interests: profileInfoData.interests || [],
        spoken_languages: profileInfoData.spoken_languages || [],
      });
    }
  }, [profileInfoData]);

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
              formik.touched.path_picture && formik.errors.path_picture
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleImageChange}
            name="path_picture"
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
            field={formik.getFieldProps("spoken_languages")}
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
        {error && (
          <div className="text-red-500 text-center ">
            Erreur lors de la mise à jour du profil
          </div>
        )}
        {isProfileInfoLoading && (
          <div className="text-blue text-center">Chargement des données...</div>
        )}
        {isProfileInfoError && (
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
