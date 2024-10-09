// import { Card, Button, Typography } from "@material-tailwind/react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// export default function GroupPreferenceForm() {
//   const formik = useFormik({
//     initialValues: {
//       travelType: [],
//       accommodation: [],
//       gender: [],
//       languages: [],
//       budget: [],
//       ageRange: [],
//     },
//     validationSchema: Yup.object({
//       travelType: Yup.array(),
//       accommodation: Yup.array(),
//       gender: Yup.array(),
//       languages: Yup.array(),
//       budget: Yup.array(),
//       ageRange: Yup.array(),
//     }),
//     onSubmit: (values) => {
//       console.log(values);
//       // Gérer la soumission ici
//     },
//   });

//   return (
//     <Card
//       shadow={false}
//       className="flex justify-center items-center min-h-screen text-black font-khula"
//     >
//       <h1>Préférences du groupe de voyage</h1>
//       <form
//         onSubmit={formik.handleSubmit}
//         className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
//       >
//         <div className="mb-1 flex flex-col gap-2">
//           <Typography variant="h6" className="mt-1 font-khula">
//             Type de voyage
//           </Typography>
//           <select
//             multiple
//             className="!border-blue"
//             {...formik.getFieldProps("travelType")}
//           >
//             <option value="">Sélectionnez un type de voyage</option>
//             <option value="aventure">Aventure</option>
//             <option value="culturel">Culturel</option>
//             <option value="détente">Détente</option>
//             <option value="luxe">Luxe</option>
//           </select>
//           {formik.touched.travelType && formik.errors.travelType ? (
//             <Typography color="red">{formik.errors.travelType}</Typography>
//           ) : null}

//           <Typography variant="h6" className="font-khula mt-4">
//             Hébergement
//           </Typography>
//           <select
//             multiple
//             className="!border-blue"
//             {...formik.getFieldProps("accommodation")}
//           >
//             <option value="">Sélectionnez un type d'hébergement</option>
//             <option value="hôtel">Hôtel</option>
//             <option value="auberge">Auberge</option>
//             <option value="maison">Maison</option>
//             <option value="camping">Camping</option>
//           </select>
//           {formik.touched.accommodation && formik.errors.accommodation ? (
//             <Typography color="red">{formik.errors.accommodation}</Typography>
//           ) : null}

//           <Typography variant="h6" className="font-khula mt-4">
//             Genre
//           </Typography>
//           <select
//             multiple
//             className="!border-blue"
//             {...formik.getFieldProps("gender")}
//           >
//             <option value="">Sélectionnez un genre</option>
//             <option value="masculin">Masculin</option>
//             <option value="féminin">Féminin</option>
//             <option value="autre">Autre</option>
//           </select>
//           {formik.touched.gender && formik.errors.gender ? (
//             <Typography color="red">{formik.errors.gender}</Typography>
//           ) : null}

//           <Typography variant="h6" className="font-khula mt-4">
//             Langues parlées
//           </Typography>
//           <select
//             multiple
//             className="!border-blue"
//             {...formik.getFieldProps("languages")}
//           >
//             <option value="français">Français</option>
//             <option value="anglais">Anglais</option>
//             <option value="espagnol">Espagnol</option>
//             <option value="allemand">Allemand</option>
//           </select>
//           {formik.touched.languages && formik.errors.languages ? (
//             <Typography color="red">{formik.errors.languages}</Typography>
//           ) : null}

//           <Typography variant="h6" className="font-khula mt-4">
//             Budget
//           </Typography>
//           <select
//             multiple
//             className="!border-blue"
//             {...formik.getFieldProps("budget")}
//           >
//             <option value="">Sélectionnez un budget</option>
//             <option value="bas">Bas</option>
//             <option value="moyen">Moyen</option>
//             <option value="élevé">Élevé</option>
//           </select>
//           {formik.touched.budget && formik.errors.budget ? (
//             <Typography color="red">{formik.errors.budget}</Typography>
//           ) : null}

//           <Typography variant="h6" className="font-khula mt-4">
//             Tranche d'âge
//           </Typography>
//           <select
//             multiple
//             className="!border-blue"
//             {...formik.getFieldProps("ageRange")}
//           >
//             <option value="">Sélectionnez une tranche d'âge</option>
//             <option value="18-25">18-25 ans</option>
//             <option value="26-35">26-35 ans</option>
//             <option value="36-45">36-45 ans</option>
//             <option value="46+">46 ans et plus</option>
//           </select>
//           {formik.touched.ageRange && formik.errors.ageRange ? (
//             <Typography color="red">{formik.errors.ageRange}</Typography>
//           ) : null}
//         </div>
//         <Button
//           className="font-montserrat font-bold mt-6 bg-blue text-white"
//           fullWidth
//           type="submit"
//         >
//           Enregistrer les préférences
//         </Button>
//       </form>
//     </Card>
//   );
// }

import React from "react";
import { Card, Button, Typography, Checkbox } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function GroupPreferenceForm() {
  const formik = useFormik({
    initialValues: {
      travelType: [],
      accommodation: [],
      gender: [],
      languages: [],
      budget: [],
      ageRange: [],
    },
    validationSchema: Yup.object({
      travelType: Yup.array(),
      accommodation: Yup.array(),
      gender: Yup.array(),
      languages: Yup.array(),
      budget: Yup.array(),
      ageRange: Yup.array(),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Gérer la soumission ici
    },
  });

  const handleCheckboxChange = (name: string, value: string) => {
    const currentValues = formik.values[name] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    formik.setFieldValue(name, newValues);
  };

  const renderCheckboxGroup = (
    name: string,
    options: { value: string; label: string }[]
  ) => (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <Checkbox
          key={option.value}
          label={option.label}
          checked={(formik.values[name] as string[]).includes(option.value)}
          onChange={() => handleCheckboxChange(name, option.value)}
          crossOrigin={undefined}
        />
      ))}
    </div>
  );

  return (
    <Card
      shadow={false}
      className="flex justify-center items-center min-h-screen text-black font-khula"
    >
      <h1>Préférences du groupe de voyage</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" className="mt-1 font-khula">
            Type de voyage
          </Typography>
          {renderCheckboxGroup("travelType", [
            { value: "aventure", label: "Aventure" },
            { value: "culturel", label: "Culturel" },
            { value: "détente", label: "Détente" },
            { value: "luxe", label: "Luxe" },
          ])}

          <Typography variant="h6" className="font-khula mt-4">
            Hébergement
          </Typography>
          {renderCheckboxGroup("accommodation", [
            { value: "hôtel", label: "Hôtel" },
            { value: "auberge", label: "Auberge" },
            { value: "maison", label: "Maison" },
            { value: "camping", label: "Camping" },
          ])}

          <Typography variant="h6" className="font-khula mt-4">
            Genre
          </Typography>
          {renderCheckboxGroup("gender", [
            { value: "masculin", label: "Masculin" },
            { value: "féminin", label: "Féminin" },
            { value: "autre", label: "Autre" },
          ])}

          <Typography variant="h6" className="font-khula mt-4">
            Langues parlées
          </Typography>
          {renderCheckboxGroup("languages", [
            { value: "français", label: "Français" },
            { value: "anglais", label: "Anglais" },
            { value: "espagnol", label: "Espagnol" },
            { value: "allemand", label: "Allemand" },
          ])}

          <Typography variant="h6" className="font-khula mt-4">
            Budget
          </Typography>
          {renderCheckboxGroup("budget", [
            { value: "bas", label: "Bas" },
            { value: "moyen", label: "Moyen" },
            { value: "élevé", label: "Élevé" },
          ])}

          <Typography variant="h6" className="font-khula mt-4">
            Tranche d'âge
          </Typography>
          {renderCheckboxGroup("ageRange", [
            { value: "18-25", label: "18-25 ans" },
            { value: "26-35", label: "26-35 ans" },
            { value: "36-45", label: "36-45 ans" },
            { value: "46+", label: "46 ans et plus" },
          ])}
        </div>
        <Button
          className="font-montserrat font-bold mt-6 bg-blue text-white"
          fullWidth
          type="submit"
        >
          Enregistrer les préférences
        </Button>
      </form>
    </Card>
  );
}
