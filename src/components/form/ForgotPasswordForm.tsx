// REACT HOOKS
import { useState } from "react";

// AXIOS FUNCTIONS
import { forgotPassword } from "../../api/auth";

// FORMIK + YUP
import { useFormik } from "formik";
import { object, string } from "yup";

// COMPONENTS
import { Typography, Input, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function ForgotPasswordForm() {
  // STATES
  const [error, setError] = useState<null | string>(null);

  // FORM LOGIC
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: object({
      email: string().email("Email invalide").required("Email requis"),
    }),
    onSubmit: async (values) => {
      try {
        setError(null);
        const response = await forgotPassword(values);
        console.log("Soumission du formulaire réussie", response);
        formik.resetForm();
      } catch (error: unknown) {
        console.log(error);
        setError(error);
      }
    },
  });

  return (
    <form
      className="w-80 max-w-screen-lg sm:w-96 flex flex-col gap-6"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col relative">
        <Typography variant="h6">E-mail</Typography>
        <Input
          size="lg"
          placeholder="maria.diana@gmail.com"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className={`!border-blue focus:!border-2 ${
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
          <div className="mt-1 text-red-500">{formik.errors.email}</div>
        )}
      </div>
      <Button className="bg-blue font-montserrat" fullWidth type="submit">
        Me renvoyer mon mot de passe
      </Button>
      {error && (
        <div className="text-red-500 text-center">Une erreur est survenue</div>
      )}
    </form>
  );
}
