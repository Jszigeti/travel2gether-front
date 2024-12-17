// AXIOS FUNCTIONS
import { useAuthApi } from "../../api/auth";

// FORMIK + YUP
import { useFormik } from "formik";
import { object, string } from "yup";

// COMPONENTS
import { Typography, Input, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordForm() {
  // Import signup function
  const { forgotPassword } = useAuthApi();

  // Import useNavigate
  const navigate = useNavigate();

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
        await forgotPassword(values);
        toast.success(
          "Un email avec les instructions vient de vous être envoyé"
        );
        formik.resetForm();
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        navigate("/signin");
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
          placeholder="marie.diana@gmail.com"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className={`!border-blue ${
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
    </form>
  );
}
