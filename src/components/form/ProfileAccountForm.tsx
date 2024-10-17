// REACT HOOKS
import { useState } from "react";

// FORMIK + YUP
import { useFormik } from "formik";
import { object, string } from "yup";

// UTILS FUNCTIONS
import { capitalizeFirstLetters } from "../../utils/capitalizeFirstLetter";

// COMPONENTS
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export function ProfileAccountForm() {
  // STATES
  const [error, setError] = useState<null | string>(null);

  // FORM LOGIC
  const formik = useFormik({
    initialValues: {
      email: "test@test.fr",
      firstname: "Prénom",
      lastname: "Nom",
    },
    validationSchema: object({
      email: string().email("E-mail invalide").required("E-mail requis"),
      firstname: string().required("Prénom requis"),
      lastname: string().required("Nom requis"),
    }),
    onSubmit: async (values) => {
      // const userData = {
      //   email: values.email,
      //   firstname: values.firstname,
      //   lastname: values.lastname,
      // };
      // try {
      //   setError(null);
      //   const response = await signup({ ...userData, id: 1 });
      //   console.log("Inscription réussie", response);
      //   if (response.id) {
      //     try {
      //       const response2 = await createProfile(response.id);
      //       console.log("Création du profil réussie", response2);
      //     } catch (error: unknown) {
      //       console.log(error);
      //       setError(error);
      //     }
      //   }
      //   onNext();
      //   formik.resetForm();
      // } catch (error: unknown) {
      //   console.log(error);
      //   setError(error);
      // }
    },
  });

  return (
    <Card
      color="transparent"
      shadow={false}
      className="flex justify-center items-center text-black"
    >
      <form
        className=" mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">E-mail</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            type="email"
            placeholder="marie.diana@gmail.com"
            className={`!border-blue  ${
              formik.touched.email && formik.errors.email
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={formik.handleChange}
            name="email"
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.email && formik.touched.email && (
            <div className="mt-1 text-red-500">{formik.errors.email}</div>
          )}
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Prénom</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            placeholder="Prénom"
            className={`!border-blue  ${
              formik.touched.firstname && formik.errors.firstname
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e) => {
              formik.setFieldValue(
                "firstname",
                capitalizeFirstLetters(e.target.value)
              );
            }}
            name="firstname"
            value={formik.values.firstname}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.firstname && formik.touched.firstname && (
            <div className="mt-1 text-red-500">{formik.errors.firstname}</div>
          )}
        </div>
        <div className="flex flex-col mb-6 relative">
          <Typography variant="h6">Nom</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            placeholder="Nom"
            className={`!border-blue  ${
              formik.touched.lastname && formik.errors.lastname
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e) => {
              formik.setFieldValue(
                "lastname",
                capitalizeFirstLetters(e.target.value)
              );
            }}
            name="lastname"
            value={formik.values.lastname}
          />
          {formik.touched.lastname && formik.errors.lastname ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.lastname && formik.touched.lastname && (
            <div className="mt-1 text-red-500">{formik.errors.lastname}</div>
          )}
        </div>

        <Button
          size="md"
          fullWidth
          className="bg-blue font-montserrat"
          type="submit"
        >
          Valider
        </Button>
        {error && (
          <div className="text-red-500 text-center ">
            Erreur lors de la mise à jour du compte
          </div>
        )}
      </form>
    </Card>
  );
}
