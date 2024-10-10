import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function GroupCreateForm() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const defaultImage =
    "https://cdn.pixabay.com/photo/2016/01/19/15/48/luggage-1149289_960_720.jpg"; // Image par défaut du formulaire

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
      title: "",
      description: "",
      location: "",
      date_from: "",
      date_to: "",
      path_picture: "",
    },
    validationSchema: Yup.object({
      path_picture: Yup.mixed().required("Une image est requise"),
      title: Yup.string().required("Le nom du groupe est requis"),
      description: Yup.string().required("La description est requise"),
      location: Yup.string().required("Le lieu est requis"),
      date_from: Yup.date().required("La date de début est requise"),
      date_to: Yup.date()
        .required("La date de fin est requise")
        .min(
          Yup.ref("date_from"),
          "La date de fin doit être après la date de début"
        ),
    }),
    onSubmit: (values) => {
      const formData = {
        ...values,
        path_picture: values.path_picture ? values.path_picture : defaultImage, // Utilise l'image par défaut si aucune image n'est sélectionnée
      };
      console.log(formData);
      formik.resetForm();
      // Gérer la soumission ici
    },
  });

  return (
    <Card
      shadow={false}
      className="flex justify-center items-center min-h-screen text-black font-khula"
    >
      <h1>Création d'un groupe de voyage</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="flex flex-col  mb-3 relative">
          <Typography variant="h6" className="font-khula">
            Choisissez une image pour votre groupe de voyage
          </Typography>
          {previewImage ? (
            <img
              src={previewImage}
              alt="Aperçu de l'image"
              className="w-full h-[16rem] object-cover rounded-md mb-1"
            />
          ) : (
            <img
              src={defaultImage}
              alt="Image par défaut"
              className="w-full h-[16rem] object-cover rounded-md mb-1"
            />
          )}
          <Input
            type="file"
            // value={formik.values.path_picture}
            size="lg"
            placeholder="Choisissez une image"
            className={`!border-blue ${
              formik.touched.path_picture && formik.errors.path_picture
                ? "!border-red-500"
                : null
            }`}
            onChange={handleImageChange}
            crossOrigin={undefined}
          />
          {formik.touched.path_picture && formik.errors.path_picture ? (
            <>
              <Typography color="red">{formik.errors.path_picture}</Typography>
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="absolute right-3 bottom-10 text-red-500"
              />
            </>
          ) : null}
        </div>

        <div className="flex flex-col  mb-3 relative">
          <Typography variant="h6" className="font-khula">
            Nom du groupe
          </Typography>
          <Input
            crossOrigin={undefined}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            size="lg"
            placeholder="Nom du groupe de voyage"
            className={`!border-blue ${
              formik.touched.title && formik.errors.title
                ? "!border-red-500"
                : null
            }`}
            {...formik.getFieldProps("title")}
          />
          {formik.touched.title && formik.errors.title ? (
            <>
              <Typography color="red">{formik.errors.title}</Typography>
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="absolute right-3 top-10 text-red-500"
              />
            </>
          ) : null}
        </div>
        <div className="flex flex-col  mb-3 relative">
          <Typography variant="h6" className="font-khula">
            Description
          </Typography>
          <Textarea
            size="lg"
            placeholder="Description du groupe de voyage"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            className={`!border-blue ${
              formik.touched.description && formik.errors.description
                ? "!border-red-500"
                : null
            }`}
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description ? (
            <>
              <Typography color="red">{formik.errors.description}</Typography>
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="absolute right-3 top-10 text-red-500"
              />
            </>
          ) : null}
        </div>

        <div className="flex flex-col  mb-3 relative">
          <Typography variant="h6" className="font-khula">
            Lieu
          </Typography>
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
          {formik.touched.location && formik.errors.location ? (
            <>
              <Typography color="red">{formik.errors.location}</Typography>
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="absolute right-3 top-10 text-red-500"
              />
            </>
          ) : null}
        </div>
        <div className="flex flex-col  mb-3 relative">
          <Typography variant="h6" className="font-khula">
            Date de début
          </Typography>
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
        <div className="flex flex-col  relative">
          <Typography variant="h6" className="font-khula">
            Date de fin
          </Typography>
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
        {/* </div> */}
        <Button
          className="font-montserrat font-bold mt-6 bg-blue text-white"
          fullWidth
          type="submit"
        >
          Créer
        </Button>
      </form>
    </Card>
  );
}
