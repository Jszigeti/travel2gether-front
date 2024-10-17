// REACT HOOKS
import { useEffect, useState } from "react";

// REACT QUERY
import { useQuery } from "@tanstack/react-query";

// ROUTER
import { useNavigate } from "react-router-dom";

// AXIOS FUNCTIONS
import { createGroup, editGroup, getGroup } from "../../api/group";

// FORMIK + YUP
import { useFormik } from "formik";
import * as Yup from "yup";

// INTERFACES
import { GroupInterface } from "../../interfaces/Group";

// COMPONENTS
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

// UTILS FUNCTIONS
import { capitalizeFirstFieldLetter } from "../../utils/capitalizeFirstLetter";

// PROPS INTERFACE
interface GroupInfoFormProps {
  groupCreationContext?: boolean;
  onNext?: () => void;
  onGroupData?: (values: GroupInterface) => void;
  paramsId?: number;
}

export default function GroupInfoForm({
  groupCreationContext = true,
  onNext,
  onGroupData,
  paramsId,
}: GroupInfoFormProps) {
  // STATES
  const [error, setError] = useState<null | string>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // REDIRECTION
  const navigate = useNavigate();

  // RETRIEVE GROUP INFO DATA
  const {
    data: groupInfoData,
    isLoading: isGroupInfoLoading,
    isError: isGroupInfoError,
  } = useQuery<GroupInterface>({
    queryKey: ["groupInfo", paramsId],
    queryFn: () => (paramsId ? getGroup(paramsId) : Promise.resolve({})),
    enabled: !groupCreationContext,
    // enabled: false,
  });

  // DEFAULT AVATAR
  const defaultImage = groupInfoData?.path_picture
    ? groupInfoData.path_picture
    : "https://cdn.pixabay.com/photo/2016/01/19/15/48/luggage-1149289_960_720.jpg";

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
      path_picture: Yup.mixed().required("Image requise"),
      title: Yup.string().required("Nom du groupe requis"),
      description: Yup.string().required("Description requise"),
      location: Yup.string().required("Lieu requis"),
      date_from: Yup.date().required("Date de début requise"),
      date_to: Yup.date()
        .required("Date de fin requise")
        .min(
          Yup.ref("date_from"),
          "La date de fin doit être après la date de début"
        ),
    }),
    onSubmit: async (values) => {
      const formData = {
        ...values,
        path_picture: values.path_picture ? values.path_picture : defaultImage,
      };
      if (groupCreationContext && onNext && onGroupData) {
        try {
          setError(null);
          const response = await createGroup({ ...formData, id: 1 });
          console.log("Création du groupe réussie", response);
          onGroupData(response);
          onNext();
          formik.resetForm();
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Une erreur inconnue est survenue");
          }
          console.log(error);
        }
      } else if (paramsId) {
        try {
          setError(null);
          const response = await editGroup(paramsId, formData);
          console.log("Mise à jour du groupe réussie", response);
          navigate(`/group/${paramsId}/edit`);
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
    if (groupInfoData) {
      formik.setValues({
        title: groupInfoData.title || "",
        description: groupInfoData.description || "",
        location: groupInfoData.location || "",
        date_from: groupInfoData.date_from || "",
        date_to: groupInfoData.date_to || "",
        path_picture: groupInfoData.path_picture || "",
      });
    }
  }, [groupInfoData]);

  return (
    <Card
      shadow={false}
      className="flex justify-center items-center text-black "
    >
      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 mb-6 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="flex flex-col  mb-3 relative">
          <Typography variant="h6">Image du groupe</Typography>
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
          <Typography variant="h6">Nom du groupe</Typography>
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
            onChange={(e) => {
              formik.setFieldValue(
                "title",
                capitalizeFirstFieldLetter(e.target.value)
              );
            }}
            name="title"
            value={formik.values.title}
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
          <Typography variant="h6">Description</Typography>
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
          <Typography variant="h6">Lieu</Typography>
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
          <Typography variant="h6">Date de début</Typography>
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
          <Typography variant="h6">Date de fin</Typography>
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
        <Button
          className="font-montserrat font-bold mt-6 bg-blue text-white"
          fullWidth
          type="submit"
        >
          {groupCreationContext ? "Créer" : "Valider"}
        </Button>
        {error && (
          <div className="text-red-500 text-center ">
            {groupCreationContext
              ? "Erreur lors de la création du groupe"
              : "Erreur lors de la mise à jour du groupe"}
          </div>
        )}
        {isGroupInfoLoading && (
          <div className="text-blue text-center">Chargement des données...</div>
        )}
        {isGroupInfoError && (
          <div className="text-red-500 text-center">
            Erreur lors du chargement des données
          </div>
        )}
      </form>
    </Card>
  );
}
