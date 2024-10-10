//import { User } from "../interfaces/User";
import {
  Button,
  Card,
  Textarea,
  Typography,
  Input,
  Avatar,
} from "@material-tailwind/react";
import { useFormik } from "formik";
//import { Link } from "react-router-dom";
import { array, object, string } from "yup";
import Dropdown from "./ui/DropdownComponent";
import { useState } from "react";
import { ProfileDataParams } from "../pages/auth/SignupPage";
import { NavLink } from "react-router-dom";

interface ProfileFormProps {
  onNext?: () => void;
  onProfileData?: (values: ProfileDataParams) => void;
}

export function ProfileForm({ onNext, onProfileData }: ProfileFormProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const defaultImage =
    "https://images-ext-1.discordapp.net/external/vj4B_0At5aHV02oJ7BEdIZ2gOKfDu1FphkjY5ojkEko/%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3Dt2RnIzl7hAwIUoupTgTDTYPZ2HCLvw5y-umBEtBsk8g%3D/https/media.istockphoto.com/id/846183008/fr/vectoriel/ic%25C3%25B4ne-de-profil-avatar-par-d%25C3%25A9faut-espace-r%25C3%25A9serv%25C3%25A9-photo-gris.jpg?format=webp"; // Image par défaut du formulaire

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      formik.setFieldValue("path_picture", file); // Set the image in Formik
    } else {
      setPreviewImage(null);
      formik.setFieldValue("path_picture", null); // Clear image field in Formik if no image is selected
    }
  };

  const formik = useFormik({
    initialValues: {
      path_picture: "",
      gender: [],
      description: "",
      interests: [],
      spoken_languages: [],
    },
    validationSchema: object({
      path_picture: string(),
      gender: array(),
      description: string(),
      interests: array(),
      spoken_languages: array(),
    }),
    onSubmit: (values) => {
      console.log(values);
      if (onProfileData) onProfileData(values);
      if (onNext) onNext();
      formik.resetForm();
    },
  });

  return (
    <Card
      color="transparent"
      shadow={false}
      className="flex justify-center items-center min-h-screen text-black font-khula"
    >
      <Typography variant="h4" className="font-montserrat">
        Mon profil
      </Typography>
      <form
        className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96"
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
            className={`!border-blue font-khula ${
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
          <Typography variant="h6" className="font-khula">
            Mon genre
          </Typography>
          <Dropdown
            options={["Homme", "Femme", "Autre"]}
            field={formik.getFieldProps("gender")}
            formik={formik}
            label="votre genre"
            multiple={false}
          />
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6" className="font-khula">
            Bio
          </Typography>
          <Textarea
            placeholder="Parlez nous de vous!"
            name="description"
            size="lg"
            onChange={formik.handleChange}
            className="!border-blue"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6" className="font-khula">
            Centres d'intérêt
          </Typography>
          <Dropdown
            options={["A", "B", "C"]}
            field={formik.getFieldProps("interests")}
            formik={formik}
            label="vos centres d'intérêt"
          />
        </div>
        <div className="flex flex-col mb-6 relative">
          <Typography variant="h6" className="font-khula">
            Langues parlées
          </Typography>
          <Dropdown
            options={["Français", "English", "Español"]}
            field={formik.getFieldProps("spoken_languages")}
            formik={formik}
            label="vos langues parlées"
          />
        </div>
        <Button size="md" fullWidth className="bg-blue" type="submit">
          Suite
        </Button>
        <Typography className="text-center font-normal font-khula mt-6">
          <NavLink to="/" className="text-blue">
            Compléter plus tard
          </NavLink>
        </Typography>
      </form>
    </Card>
  );
}
