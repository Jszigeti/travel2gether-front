// Router
import { NavLink } from "react-router-dom";

// Custom hook with form logic
import useSignupForm from "./useSignupForm";

// Components
import FormInput from "../formComponents/FormInput";
import { Button, Typography } from "@material-tailwind/react";

// Props interface
interface SignupFormProps {
  onNext: () => void;
}

export function SignupForm({ onNext }: SignupFormProps) {
  const { formik } = useSignupForm({ onNext });

  return (
    <form
      className="mt-6 mb-6 w-80 max-w-screen-lg sm:w-96"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-3 mb-6">
        <FormInput
          title="E-mail"
          name="email"
          formik={formik}
          placeholder="jean.dupont@gmail.com"
        />
        <FormInput
          title="Prénom"
          name="firstname"
          formik={formik}
          placeholder="Jean"
          capitalizeFirstLetter
        />
        <FormInput
          title="Nom"
          name="lastname"
          formik={formik}
          placeholder="Dupont"
          capitalizeFirstLetter
        />
        <FormInput
          title="Mot de passe"
          name="password"
          inputType="password"
          formik={formik}
          placeholder="********"
        />
        <FormInput
          title="Confirmation du mot de passe"
          name="passwordmatch"
          inputType="password"
          formik={formik}
          placeholder="********"
        />
      </div>
      <Button
        size="md"
        fullWidth
        className="bg-blue font-montserrat"
        type="submit"
      >
        M'inscrire
      </Button>
      <Typography className="text-center font-normal  mt-6">
        Déjà inscrit ?{" "}
        <NavLink to="/signin" className="text-blue font-bold">
          Se connecter
        </NavLink>
      </Typography>
    </form>
  );
}
