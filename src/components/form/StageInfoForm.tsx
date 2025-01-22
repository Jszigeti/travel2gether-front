import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StageInterface } from "../../interfaces/Stage";
import {
  createStage,
  deleteStage,
  editStage,
  getStageFromGroup,
} from "../../api/stage";
import { useNavigate } from "react-router-dom";
import { getSuggestions, NominatimSuggestion } from "../../utils/nominatimApi";

interface StageInfoFormProps {
  stageCreationContext?: boolean;
  groupId: number;
  stageId?: number;
}

export default function StageInfoForm({
  stageCreationContext = true,
  groupId,
  stageId,
}: StageInfoFormProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<NominatimSuggestion[]>([]);
  const [error, setError] = useState<null | string>(null);

  const navigate = useNavigate();

  // QUERY CLIENT DECLARATION
  const queryClient = useQueryClient();

  // RETRIEVE STAGE INFO DATA
  const {
    data: stageInfo,
    isLoading: isStageInfoLoading,
    isError: isStageInfoError,
  } = useQuery<StageInterface>({
    queryKey: ["stageInfo", stageId],
    queryFn: () =>
      stageId
        ? getStageFromGroup(groupId, stageId)
        : Promise.reject(new Error("Group ID and stage ID are required")),
    enabled: !stageCreationContext,
  });

  const defaultImage = stageInfo?.pathPicture
    ? stageInfo.pathPicture
    : "https://media.istockphoto.com/id/489556478/fr/photo/outils-de-voyage.jpg?s=1024x1024&w=is&k=20&c=dqsRCnDCKNcDi8Fnlzs96pAapEbH5PR01VQ6cEtC72U="; // Image par défaut du formulaire

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      formik.setFieldValue("pathPicture", file); // Set the image in Formik
    } else {
      setPreviewImage(null);
      formik.setFieldValue("pathPicture", null); // Clear image field in Formik if no image is selected
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      address: "",
      dateFrom: "",
      dateTo: "",
      pathPicture: "",
      latitude: "",
      longitude: "",
    },
    validationSchema: Yup.object({
      pathPicture: Yup.mixed().required("Une image est requise"),
      title: Yup.string().required("Le nom du groupe est requis"),
      description: Yup.string().required("La description est requise"),
      address: Yup.string().required("Le lieu est requis"),
      dateFrom: Yup.date().required("La date de début est requise"),
      dateTo: Yup.date()
        .required("La date de fin est requise")
        .min(
          Yup.ref("dateFrom"),
          "La date de fin doit être après la date de début"
        ),
    }),
    onSubmit: async (values) => {
      const formData = {
        ...values,
        pathPicture: values.pathPicture ? values.pathPicture : defaultImage, // Utilise l'image par défaut si aucune image n'est sélectionnée
      };

      if (stageCreationContext) {
        try {
          setError(null);
          const response = await createStage(groupId, formData);
          console.log("Création de l'étape réussie ", response);
          queryClient.invalidateQueries({
            queryKey: ["groupDetails", groupId],
          });
          formik.resetForm();
          navigate(`/group/${groupId}/stage/${response.id}`);
        } catch (errors: unknown) {
          if (errors instanceof Error) {
            setError(errors.message);
          } else {
            setError("Une erreur est survenue");
          }
          console.log(errors);
        }
      } else if (stageId) {
        try {
          setError(null);
          const response = await editStage(groupId, stageId, formData);
          console.log("Modification de l'étape réussie ", response);
          queryClient.setQueryData(["stageInfo", stageId], formData);
          queryClient.invalidateQueries({
            queryKey: ["groupDetails", groupId],
          });
          navigate(`/group/${groupId}/stage/${stageId}`);
        } catch (errors: unknown) {
          if (errors instanceof Error) {
            setError(errors.message);
          } else {
            setError("Une erreur est survenue");
          }
          console.log(errors);
        }
      }
    },
  });

  useEffect(() => {
    if (stageInfo) {
      formik.setFieldValue("title", stageInfo.title);
      formik.setFieldValue("description", stageInfo.description);
      formik.setFieldValue("address", stageInfo.address);
      formik.setFieldValue("dateFrom", stageInfo.dateFrom);
      formik.setFieldValue("dateTo", stageInfo.dateTo);
      formik.setFieldValue("pathPicture", stageInfo.pathPicture);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageInfo]);

  const handleDeleteStage = async () => {
    if (stageId) {
      try {
        setError(null);
        const response = await deleteStage(groupId, stageId);
        console.log("Étape supprimée ", response);
        queryClient.invalidateQueries({ queryKey: ["groupDetails", groupId] });
        navigate(`/group/${groupId}/manage`);
      } catch (errors: unknown) {
        if (errors instanceof Error) {
          setError(errors.message);
        } else {
          setError("Une erreur est survenue");
        }
        console.log(errors);
      }
    }
  };

  const handleAddressChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    formik.setFieldValue("address", query);
    if (query.length > 3) {
      try {
        const suggestions = await getSuggestions(query);
        setSuggestions(suggestions);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des suggestions :",
          error
        );
        setSuggestions([]);
      }
    }
  };

  const handleSuggestionSelect = (suggestion: NominatimSuggestion) => {
    formik.setFieldValue("address", suggestion.display_name);
    formik.setFieldValue("latitude", suggestion.lat);
    formik.setFieldValue("longitude", suggestion.lon);
    setSuggestions([]);
  };

  return (
    <Card
      shadow={false}
      className="flex justify-center items-center min-h-screen text-black "
    >
      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 mb-6 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="flex flex-col  mb-3 relative">
          <Typography variant="h6">
            Choisissez une image pour votre étape
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
            // value={formik.values.pathPicture}
            size="lg"
            placeholder="Choisissez une image"
            className={`!border-blue ${
              formik.touched.pathPicture && formik.errors.pathPicture
                ? "!border-red-500"
                : null
            }`}
            onChange={handleImageChange}
            crossOrigin={undefined}
          />
          {formik.touched.pathPicture && formik.errors.pathPicture ? (
            <>
              <Typography color="red">{formik.errors.pathPicture}</Typography>
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="absolute right-3 bottom-10 text-red-500"
              />
            </>
          ) : null}
        </div>

        <div className="flex flex-col  mb-3 relative">
          <Typography variant="h6">Nom de l'étape</Typography>
          <Input
            crossOrigin={undefined}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            size="lg"
            placeholder="Nom de l'étape"
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
          <Typography variant="h6">Description</Typography>
          <Textarea
            size="lg"
            placeholder="Description de l'étape"
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

        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Lieu</Typography>
          <Input
            crossOrigin={undefined}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            size="lg"
            placeholder="Lieu de l'étape"
            className={`!border-blue ${
              formik.touched.address && formik.errors.address
                ? "!border-red-500"
                : null
            }`}
            {...formik.getFieldProps("address")}
            onChange={handleAddressChange}
          />
          {suggestions.length > 0 && (
            <ul className="bg-white border rounded-md shadow-lg absolute top-[4.25rem] z-10 mt-1 max-h-48 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.place_id}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {suggestion.display_name}
                </div>
              ))}
            </ul>
          )}
          {formik.touched.address && formik.errors.address && (
            <>
              <Typography color="red">{formik.errors.address}</Typography>
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="absolute right-3 top-10 text-red-500"
              />
            </>
          )}
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
              formik.touched.dateFrom && formik.errors.dateFrom
                ? "!border-red-500"
                : null
            }`}
            {...formik.getFieldProps("dateFrom")}
          />
          {formik.touched.dateFrom && formik.errors.dateFrom ? (
            <>
              <Typography color="red">{formik.errors.dateFrom}</Typography>
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
              formik.touched.dateTo && formik.errors.dateTo
                ? "!border-red-500"
                : null
            }`}
            {...formik.getFieldProps("dateTo")}
          />
          {formik.touched.dateTo && formik.errors.dateTo ? (
            <>
              <Typography color="red">{formik.errors.dateTo}</Typography>
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
          {stageCreationContext ? "Créer" : "Éditer"}
        </Button>
        {!stageCreationContext && (
          <Button
            className="font-montserrat font-bold mt-6 bg-red-500 text-white"
            fullWidth
            onClick={() => handleDeleteStage()}
          >
            Supprimer
          </Button>
        )}

        {error && (
          <div className="text-red-500 text-center ">
            {stageCreationContext
              ? "Erreur lors de la création de l'étape"
              : "Erreur lors de la mise à jour de l'étape"}
          </div>
        )}
        {isStageInfoLoading && (
          <div className="text-blue text-center">Chargement des données...</div>
        )}
        {isStageInfoError && (
          <div className="text-red-500 text-center">
            Erreur lors du chargement des données
          </div>
        )}
      </form>
    </Card>
  );
}
