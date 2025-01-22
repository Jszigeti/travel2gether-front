// Custom hook with form logic
import useResetPasswordForm from "./useResetPasswordForm";

// Components
import FormInput from "../formComponents/FormInput";
import { Button } from "@material-tailwind/react";

export function ResetPasswordForm() {
  const { formik } = useResetPasswordForm();

  return (
    <form
      className="mt-6 mb-6 w-80 max-w-screen-lg sm:w-96"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-3 mb-6">
        <FormInput
          title="Nouveau mot de passe"
          name="password"
          inputType="password"
          formik={formik}
          placeholder="********"
        />
        <FormInput
          title="Confirmation du nouveau mot de passe"
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
        Valider
      </Button>
    </form>
  );
}
