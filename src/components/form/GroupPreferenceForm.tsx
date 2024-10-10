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
            options={["Aventure", "Culturel", "Détente", "Luxe"]}
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
            options={["Hôtel", "Auberge", "Maison", "Camping"]}
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
            options={["Masculin", "Féminin", "Autre"]}
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
            options={["Français", "Anglais", "Espagnol", "Allemand"]}
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
            options={["Bas", "Moyen", "Élevé"]}
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
            options={["18-25 ans", "26-35 ans", "36-45 ans", "46 ans et plus"]}
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
