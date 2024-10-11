import { Card, Button, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropdown from "../UI/DropdownComponent";

export default function GroupPreferenceForm() {
  const formik = useFormik({
    initialValues: {
      travel_types: [],
      lodgings: [],
      gender_type: [],
      spoken_languages: [],
      budget: [],
      age_ranges: [],
    },
    validationSchema: Yup.object({
      travel_types: Yup.array(),
      lodgings: Yup.array(),
      gender_type: Yup.array(),
      spoken_languages: Yup.array(),
      budget: Yup.array(),
      age_ranges: Yup.array(),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Gérer la soumission ici
    },
  });

  const travelTypesOptions = [
    { value: "adventure", label: "Aventure" },
    { value: "cultural", label: "Culturel" },
    { value: "relaxation", label: "Détente" },
    { value: "luxury", label: "Luxe" },
    { value: "hiking", label: "Randonnée" },
    { value: "beach", label: "Plage" },
    { value: "road_trip", label: "Road Trip" },
    { value: "cruise", label: "Croisière" },
    { value: "family_trip", label: "Famililale" },
    { value: "romantic_trip", label: "Romantique" },
    { value: "friends_trip", label: "Voyage entre ami(e)s" },
    { value: "eco_friendly", label: "Écologique" },
  ];
  const lodgingsOptions = [
    { value: "youth_hotel", label: "Auberge" },
    { value: "hotel", label: "Hotel" },
    { value: "airbnb", label: "AirBnb" },
    { value: "camping", label: "Camping" },
    { value: "ecolodge", label: "Eco logement" },
    { value: "luxury", label: "Luxueux" },
  ];
  const genderOptions = [
    { value: "male", label: "Masculin" },
    { value: "female", label: "Féminin" },
    { value: "other", label: "Autres" },
    { value: "mixed", label: "Mixte" },
  ];
  const spokenLanguagesOptions = [
    { value: "french", label: "Français" },
    { value: "english", label: "Anglais" },
    { value: "spanish", label: "Espagnol" },
    { value: "portuguese", label: "Portugais" },
    { value: "arabic", label: "Arabe" },
    { value: "italian", label: "Italien" },
    { value: "japanese", label: "Japonais" },
    { value: "mandarin", label: "Mandarin" },
    { value: "greek", label: "Grèque" },
    { value: "deutsch", label: "Deutsh" },
    { value: "dutch", label: "Allemand" },
    { value: "russian", label: "Russe" },
    { value: "hindi", label: "Hindi" },
  ];
  const budgetOptions = [
    { value: "low", label: "Bas" },
    { value: "middle", label: "Moyen" },
    { value: "high", label: "Haut" },
    { value: "luxury", label: "Luxe" },
  ];
  const ageRangesOptions = [
    { value: "18-25", label: "18-25" },
    { value: "25-35", label: "25-35" },
    { value: "35-50", label: "35-50" },
    { value: "50+", label: "50+" },
  ];
  return (
    <Card
      shadow={false}
      className="flex justify-center items-center min-h-screen text-black font-khula"
    >
      <h1>Préférences du groupe de voyage</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-2">
          <Typography variant="h6" className="mt-1 font-khula">
            Type de voyage
          </Typography>
          <Dropdown
            label="un type de voyage"
            options={travelTypesOptions}
            field={formik.getFieldProps("travel_types")}
            formik={formik}
          />
          {formik.touched.travel_types && formik.errors.travel_types ? (
            <Typography color="red">{formik.errors.travel_types}</Typography>
          ) : null}

          <Typography variant="h6" className="font-khula mt-4">
            Hébergement
          </Typography>
          <Dropdown
            label="un type d'hébergement"
            options={lodgingsOptions}
            field={formik.getFieldProps("lodgings")}
            formik={formik}
          />
          {formik.touched.lodgings && formik.errors.lodgings ? (
            <Typography color="red">{formik.errors.lodgings}</Typography>
          ) : null}

          <Typography variant="h6" className="font-khula mt-4">
            Genre
          </Typography>
          <Dropdown
            multiple={false}
            label="un genre"
            options={genderOptions}
            field={formik.getFieldProps("gender_type")}
            formik={formik}
          />
          {formik.touched.gender_type && formik.errors.gender_type ? (
            <Typography color="red">{formik.errors.gender_type}</Typography>
          ) : null}

          <Typography variant="h6" className="font-khula mt-4">
            Langues parlées
          </Typography>
          <Dropdown
            label="une langue"
            options={spokenLanguagesOptions}
            field={formik.getFieldProps("spoken_languages")}
            formik={formik}
          />
          {formik.touched.spoken_languages && formik.errors.spoken_languages ? (
            <Typography color="red">
              {formik.errors.spoken_languages}
            </Typography>
          ) : null}

          <Typography variant="h6" className="font-khula mt-4">
            Budget
          </Typography>
          <Dropdown
            label="un budget"
            multiple={false}
            options={budgetOptions}
            field={formik.getFieldProps("budget")}
            formik={formik}
          />
          {formik.touched.budget && formik.errors.budget ? (
            <Typography color="red">{formik.errors.budget}</Typography>
          ) : null}

          <Typography variant="h6" className="font-khula mt-4">
            Tranche d'âge
          </Typography>
          <Dropdown
            label="une tranche d'âge"
            options={ageRangesOptions}
            field={formik.getFieldProps("age_ranges")}
            formik={formik}
          />
          {formik.touched.age_ranges && formik.errors.age_ranges ? (
            <Typography color="red">{formik.errors.age_ranges}</Typography>
          ) : null}
        </div>

        <Button
          className="font-montserrat font-bold mt-6 bg-blue text-white"
          fullWidth
          type="submit"
        >
          Enregistrer les préférences
        </Button>
      </form>
      {/* <NavLink className="text-blue" to={`/group/${ groupd_id }/edit`}>
        Compléter les préférences plus tard
      </NavLink> */}
    </Card>
  );
}
