// REACT HOOKS
import { useState } from "react";

// FORMIK + YUP
import { useFormik } from "formik";
import { object, string } from "yup";

// COMPONENTS
import { Typography, Input, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function SigninForm() {
  const [error, setError] = useState(false);

  // FAKE CREDENTIALS CHECK FUNCTION
  const verifyCredentials = (values: { email: string; password: string }) => {
    if (
      values.email === "maria.diana@gmail.com" &&
      values.password === "1234"
    ) {
      setError(false);
    } else {
      setError(true);
    }
  };

  // FORM LOGIC
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      travel_types: [],
    },
    validationSchema: object({
      email: string().email("Email invalide").required("Email requis"),
      password: string().required("Mot de passe requis"),
    }),
    onSubmit: (values) => {
      verifyCredentials(values);
      console.log({ ...values });
      formik.resetForm();
    },
  });

  return (
    <form
      className="w-80 max-w-screen-lg sm:w-96 flex flex-col gap-6"
      onSubmit={formik.handleSubmit}
    >
      <div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6" className="font-khula">
            E-mail
          </Typography>
          <Input
            size="lg"
            placeholder="maria.diana@gmail.com"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className={`!border-blue font-khula ${
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
            <div className="mt-1 text-red-500 font-khula">
              {formik.errors.email}
            </div>
          )}
        </div>
        <div className="flex flex-col relative">
          <Typography variant="h6" className="font-khula">
            Mot de passe
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className={`!border-blue font-khula focus:!border-2 ${
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
            <div className="mt-1 text-red-500 font-khula">
              {formik.errors.password}
            </div>
          )}
        </div>
      </div>
      <Button className="bg-blue font-montserrat" fullWidth type="submit">
        Me connecter
      </Button>
      {error && (
        <div className="text-red-500 text-center font-khula">
          Identifiant ou mot de passe incorrect
        </div>
      )}
    </form>
  );
}
