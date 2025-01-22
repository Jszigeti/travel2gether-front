// Custom hook with form logic
import useProfileAccountForm from "./useProfileAccountForm";

// Components
import FormInput from "../formComponents/FormInput";
import DisplayLoadingAndErrorMessages from "../../UI/DisplayLoadingAndErrorMessages";
import { Button } from "@material-tailwind/react";

export function ProfileAccountForm() {
  const { formik, isProfileAccountLoading, isProfileAccountError } =
    useProfileAccountForm();
  return (
    <form
      className="mt-6 mb-6 w-80 max-w-screen-lg sm:w-96"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-3 mb-6">
        <FormInput
          title="E-mail"
          name="email"
          inputType="email"
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
      </div>
      <Button
        size="md"
        fullWidth
        className="bg-blue font-montserrat"
        type="submit"
      >
        Valider
      </Button>
      <DisplayLoadingAndErrorMessages
        loading={isProfileAccountLoading}
        error={isProfileAccountError}
      />
    </form>
  );
}
