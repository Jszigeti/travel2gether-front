// REACT HOOKS
import { useContext, useState } from "react";

// CONTEXT
import UserContext from "../../hooks/context/user.context";

// ROUTER
import { useNavigate } from "react-router-dom";

// AXIOS FUNCTIONS
import { useAuthApi } from "../../api/auth";

// FORMIK + YUP
import { useFormik } from "formik";
import { object, string, ref } from "yup";

// COMPONENTS
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export function ProfilePasswordForm() {
  // STATES
  const [error, setError] = useState<null | string>(null);

  // Import signup function
  const { editPassword } = useAuthApi();

  // RETRIEVE USER ID
  const { userId } = useContext(UserContext) || {};

  // REDIRECTION
  const navigate = useNavigate();

  // FORM LOGIC
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      passwordmatch: "",
    },
    validationSchema: object({
      oldPassword: string()
        .required("Mot de passe requis")
        .min(8, "Au moins 8 caractères"),
      password: string()
        .required("Mot de passe requis")
        .min(8, "Au moins 8 caractères"),
      passwordmatch: string()
        .oneOf([ref("password"), ""], "Les mots de passe doivent correspondre")
        .required("Confirmation du mot de passe requise"),
    }),
    onSubmit: async (values) => {
      if (userId) {
        try {
          setError(null);
          const response = await editPassword(userId, values);
          console.log("Modification du mot de passe réussie", response);
          navigate("/my-profile/edit/account");
          formik.resetForm();
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Une erreur inconnue est survenue");
          }
          console.log(error);
        }
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
          <Typography variant="h6">Ancien mot de passe</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            type="password"
            placeholder="********"
            className={`!border-blue  ${
              formik.touched.oldPassword && formik.errors.oldPassword
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={formik.handleChange}
            name="oldPassword"
            value={formik.values.oldPassword}
          />
          {formik.touched.oldPassword && formik.errors.oldPassword ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.oldPassword && formik.touched.oldPassword && (
            <div className="mt-1 text-red-500">{formik.errors.oldPassword}</div>
          )}
        </div>
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
        {error && (
          <div className="text-red-500 text-center ">
            Erreur lors du changement de mot de passe
          </div>
        )}
      </form>
    </Card>
  );
}
