// REACT HOOKS
import { useState } from "react";

// ROUTER
import { useNavigate } from "react-router-dom";

// AXIOS FUNCTIONS
import { signin } from "../../api/auth";

// FORMIK + YUP
import { useFormik } from "formik";
import { object, string } from "yup";

// COMPONENTS
import { Typography, Input, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function SigninForm() {
  // STATES
  const [error, setError] = useState<null | string>(null);

  // REDIRECTION
  const navigate = useNavigate();

  // FORM LOGIC
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: object({
      email: string().email("E-mail invalide").required("E-mail requis"),
      password: string().required("Mot de passe requis"),
    }),
    onSubmit: async (values) => {
      try {
        setError(null);
        const response = await signin(values);
        console.log("Connexion réussie", response);
        navigate(`/`);
        formik.resetForm();
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Une erreur inconnue est survenue");
        }
        console.log(error);
      }
    },
  });

  return (
    <form
      className="w-80 max-w-screen-lg sm:w-96 flex flex-col gap-6"
      onSubmit={formik.handleSubmit}
    >
      <div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">E-mail</Typography>
          <Input
            size="lg"
            placeholder="marie.diana@gmail.com"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className={`!border-blue  ${
              formik.touched.email && formik.errors.email
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={undefined}
          />
          {formik.touched.email && formik.errors.email ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.email && formik.touched.email && (
            <div className="mt-1 text-red-500 ">{formik.errors.email}</div>
          )}
        </div>
        <div className="flex flex-col relative">
          <Typography variant="h6">Mot de passe</Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className={`!border-blue ${
              formik.touched.password && formik.errors.password
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={undefined}
          />
          {formik.touched.password && formik.errors.password ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.password && formik.touched.password && (
            <div className="mt-1 text-red-500 ">{formik.errors.password}</div>
          )}
        </div>
      </div>
      <Button className="bg-blue font-montserrat" fullWidth type="submit">
        Me connecter
      </Button>
      {error && (
        <div className="text-red-500 text-center ">
          Identifiant ou mot de passe incorrect
        </div>
      )}
    </form>
  );
}
