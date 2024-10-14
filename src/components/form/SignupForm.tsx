// REACT HOOKS
import { useState } from "react";

// ROUTER
import { NavLink } from "react-router-dom";

// AXIOS FUNCTIONS
import { signup } from "../../api/auth";

// FORMIK + YUP
import { useFormik } from "formik";
import { object, string, ref } from "yup";

// UTILS FUNCTIONS
import { capitalizeFirstLetters } from "../../utils/capitalizeFirstLetter";

// COMPONENTS
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

// PROPS INTERFACE
interface SignupFormProps {
  onNext: () => void;
}
export function SignupForm({ onNext }: SignupFormProps) {
  // STATES
  const [error, setError] = useState<null | string>(null);

  // FORM LOGIC
  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      passwordmatch: "",
    },
    validationSchema: object({
      email: string().email("E-mail invalide").required("E-mail requis"),
      password: string()
        .required("Mot de passe requis")
        .min(8, "Au moins 8 caractères"),
      passwordmatch: string()
        .oneOf([ref("password"), ""], "Les mots de passe doivent correspondre")
        .required("Confirmation du mot de passe requise"),
      firstname: string().required("Prénom requis"),
      lastname: string().required("Nom requis"),
    }),
    onSubmit: async (values) => {
      const userData = {
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        password: values.password,
      };
      try {
        setError(null);
        const response = await signup(userData);
        console.log("Inscription réussie", response);
        onNext();
        formik.resetForm();
      } catch (error: unknown) {
        console.log(error);
        setError(error);
      }
    },
  });

  return (
    <Card
      color="transparent"
      shadow={false}
      className="flex justify-center items-center min-h-screen text-black"
    >
      <Typography variant="h4" className="font-montserrat">
        Créer mon compte
      </Typography>
      <form
        className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">E-mail</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            type="email"
            placeholder="name@email.com"
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
            <div>{formik.errors.email}</div>
          )}
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Prénom</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            placeholder="Insert title here"
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
            <div>{formik.errors.firstname}</div>
          )}
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Nom</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            placeholder="Insert title here"
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
            <div>{formik.errors.lastname}</div>
          )}
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Mot de passe</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            type="password"
            placeholder="Insert title here"
            className={`!border-blue  ${
              formik.touched.password && formik.errors.password
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={formik.handleChange}
            name="password"
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.password && formik.touched.password && (
            <div>{formik.errors.password}</div>
          )}
        </div>
        <div className="flex flex-col mb-6 relative">
          <Typography variant="h6">Confirmer le mot de passe</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            type="password"
            placeholder="Insert title here"
            className={`!border-blue  ${
              formik.touched.email && formik.errors.email
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={formik.handleChange}
            name="passwordmatch"
            value={formik.values.passwordmatch}
          />
          {formik.touched.passwordmatch && formik.errors.passwordmatch ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.passwordmatch && formik.touched.passwordmatch && (
            <div>{formik.errors.passwordmatch}</div>
          )}
        </div>
        <Button
          size="md"
          fullWidth
          className="bg-blue font-montserrat"
          type="submit"
        >
          M'inscrire
        </Button>
        {error && (
          <div className="text-red-500 text-center ">
            Erreur lors de la création du compte
          </div>
        )}
        <Typography className="text-center font-normal  mt-6">
          Déjà inscrit ?{" "}
          <NavLink to="/signin" className="text-blue font-bold">
            Se connecter
          </NavLink>
        </Typography>
      </form>
    </Card>
  );
}
