// FORMIK + YUP
import { useFormik } from "formik";
import { object, string } from "yup";

// COMPONENTS
import { Typography, Input, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function ForgotPasswordForm() {
  // FORM LOGIC
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: object({
      email: string().email().required(),
    }),
    onSubmit: (values) => {
      console.log({ ...values });
      formik.resetForm();
    },
  });

  return (
    <form
      className="w-80 max-w-screen-lg sm:w-96 flex flex-col gap-6"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-6 mb-3 relative">
        <Typography variant="h6" className="-mb-3 font-khula">
          E-mail
        </Typography>
        <Input
          size="lg"
          placeholder="maria.diana@gmail.com"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className={`!border-blue font-khula focus:!border-2 ${
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
            className="absolute right-3 top-[52px] text-red-500"
          />
        ) : null}
      </div>
      <Button className="bg-blue font-montserrat" fullWidth type="submit">
        Me renvoyer mon mot de passe
      </Button>
    </form>
  );
}
