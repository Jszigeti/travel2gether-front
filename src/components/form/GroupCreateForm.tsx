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

export function GroupCreateForm() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const defaultImage = "public/default-image.jpg"; // Image par défaut du formulaire

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      formik.setFieldValue("image", file); // Set the image in Formik
    } else {
      setPreviewImage(null);
      formik.setFieldValue("image", null); // Clear image field in Formik if no image is selected
    }
  };

  const formik = useFormik({
    initialValues: {
      groupName: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
      image: null,
    },
    validationSchema: Yup.object({
      groupName: Yup.string().required("Le nom du groupe est requis"),
      description: Yup.string().required("La description est requise"),
      location: Yup.string().required("Le lieu est requis"),
      startDate: Yup.date().required("La date de début est requise"),
      endDate: Yup.date()
        .required("La date de fin est requise")
        .min(
          Yup.ref("startDate"),
          "La date de fin doit être après la date de début"
        ),
    }),
    onSubmit: (values) => {
      const formData = {
        ...values,
        image: values.image ? values.image : defaultImage, // Utilise l'image par défaut si aucune image n'est sélectionnée
      };
      console.log(formData);
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
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-2">
          <Typography variant="h6" className="mt-1 font-khula">
            Choisissez une image pour votre groupe de voyage
          </Typography>
          {previewImage ? (
            <img
              src={previewImage}
              alt="Aperçu de l'image"
              className="w-full object-cover rounded-md"
            />
          ) : (
            <img
              src={defaultImage}
              alt="Image par défaut"
              className="w-full object-cover rounded-md"
            />
          )}
          <Input
            type="file"
            size="lg"
            placeholder="Choisissez une image"
            className="!border-blue"
            onChange={handleImageChange}
            crossOrigin={undefined}
          />
          {/* Affichage des erreurs manuellement */}
          {formik.touched.image && formik.errors.image ? (
            <Typography color="red">{formik.errors.image}</Typography>
          ) : null}

          <Typography variant="h6" className="font-khula mt-4">
            Nom du groupe
          </Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            placeholder="Nom du groupe de voyage"
            className="!border-blue"
            {...formik.getFieldProps("groupName")}
          />
          {formik.touched.groupName && formik.errors.groupName ? (
            <Typography color="red">{formik.errors.groupName}</Typography>
          ) : null}

          <Typography variant="h6" className="font-khula mt-4">
            Description
          </Typography>
          <Textarea
            size="lg"
            placeholder="Description du groupe de voyage"
            className="!border-blue"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description ? (
            <Typography color="red">{formik.errors.description}</Typography>
          ) : null}

          <Typography variant="h6" className="font-khula mt-4">
            Lieu
          </Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            placeholder="Lieu du groupe de voyage"
            className="!border-blue"
            {...formik.getFieldProps("location")}
          />
          {formik.touched.location && formik.errors.location ? (
            <Typography color="red">{formik.errors.location}</Typography>
          ) : null}

          <Typography variant="h6" className="font-khula mt-4">
            Date de début
          </Typography>
          <Input
            crossOrigin={undefined}
            type="date"
            size="lg"
            placeholder="Date de début du groupe de voyage"
            className="!border-blue"
            {...formik.getFieldProps("startDate")}
          />
          {formik.touched.startDate && formik.errors.startDate ? (
            <Typography color="red">{formik.errors.startDate}</Typography>
          ) : null}

          <Typography variant="h6" className="font-khula mt-4">
            Date de fin
          </Typography>
          <Input
            crossOrigin={undefined}
            type="date"
            size="lg"
            placeholder="Date de fin du groupe de voyage"
            className="!border-blue"
            {...formik.getFieldProps("endDate")}
          />
          {formik.touched.endDate && formik.errors.endDate ? (
            <Typography color="red">{formik.errors.endDate}</Typography>
          ) : null}
        </div>
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
