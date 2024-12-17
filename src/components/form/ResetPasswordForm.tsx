// ROUTER
import { useNavigate, useParams } from "react-router-dom";

// AXIOS FUNCTIONS
import { useAuthApi } from "../../api/auth";

// FORMIK + YUP
import { useFormik } from "formik";
import { object, string, ref } from "yup";

// COMPONENTS
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export function ResetPasswordForm() {
  // Import signup function
  const { resetPassword } = useAuthApi();

  // REDIRECTION
  const navigate = useNavigate();

  // USEPARAMS HOOK
  const { userId, resetToken } = useParams();

  // FORM LOGIC
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordmatch: "",
    },
    validationSchema: object({
      password: string()
        .required("Mot de passe requis")
        .min(8, "Au moins 8 caractères"),
      passwordmatch: string()
        .oneOf([ref("password"), ""], "Les mots de passe doivent correspondre")
        .required("Confirmation du mot de passe requise"),
    }),
    onSubmit: async (values) => {
      if (userId && resetToken) {
        try {
          await resetPassword(userId, resetToken, values.password);
          toast.success(
            "Votre mot de passe a été réinitialisé avec succès, vous pouvez maintenant vous connecté !"
          );
          navigate("/signin");
          formik.resetForm();
        } catch {
          toast.error(
            "Une erreur est survenue, un nouveau mail vient de vous être envoyé."
          );
        } finally {
          navigate("/signin");
        }
      } else {
        toast.error("Une erreur est survenue, veuillez réessayer.");
        navigate("/signin");
      }
    },
  });

  return (
    <Card
      color="transparent"
      shadow={false}
      className="flex justify-center items-center text-black"
    >
      <form
        className="mt-6 mb-6 w-80 max-w-screen-lg sm:w-96"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Nouveau mot de passe</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            type="password"
            placeholder="********"
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
            <div className="mt-1 text-red-500">{formik.errors.password}</div>
          )}
        </div>
        <div className="flex flex-col mb-6 relative">
          <Typography variant="h6">Confirmer le mot de passe</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            type="password"
            placeholder="********"
            className={`!border-blue  ${
              formik.touched.passwordmatch && formik.errors.passwordmatch
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
            <div className="mt-1 text-red-500">
              {formik.errors.passwordmatch}
            </div>
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
      </form>
    </Card>
  );
}
