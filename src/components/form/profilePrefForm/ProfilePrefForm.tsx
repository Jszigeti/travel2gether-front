// FORM DATA
import {
  budgetOptions,
  lodgingsOptions,
  travelTypesOptions,
  tripDurationsOptions,
} from "../../../data/formOptions";

// COMPONENTS
import { Button } from "@material-tailwind/react";
import useProfilePrefForm from "./useProfilePrefForm";
import CompleteLaterButton from "../formComponents/CompleteLaterButton";
import DisplayLoadingAndErrorMessages from "../../UI/DisplayLoadingAndErrorMessages";
import SelectInput from "../formComponents/SelectInput";
import FormInput from "../formComponents/FormInput";

// PROPS INTERFACE
interface ProfilePrefFormProps {
  signupContext?: boolean;
}

export function ProfilePrefForm({
  signupContext = true,
}: ProfilePrefFormProps) {
  const { formik, isProfilePrefLoading, isProfilePrefError } =
    useProfilePrefForm({ signupContext });

  return (
    <form
      className="w-80 max-w-screen-lg sm:w-96"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-3 mb-6">
        <SelectInput
          title="Types de voyage"
          label="Vos types de voyages"
          options={travelTypesOptions}
          formik={formik}
          fieldName="travelTypes"
        />
        <SelectInput
          title="Mon budget"
          label="Votre budget"
          options={budgetOptions}
          formik={formik}
          fieldName="budget"
          multiple={false}
        />
        <SelectInput
          title="Préférences d'hébergement"
          label="Vos préférences d'hébergement"
          options={lodgingsOptions}
          formik={formik}
          fieldName="lodgings"
        />
        <FormInput
          title="Mes disponibilités"
          name="availableFrom"
          inputType="date"
          formik={formik}
          placeholder="Début"
        />
        <FormInput
          name="availableTo"
          inputType="date"
          formik={formik}
          placeholder="Fin"
        />
        <SelectInput
          title="Durées de voyage"
          label="Vos durées de voyage"
          options={tripDurationsOptions}
          formik={formik}
          fieldName="tripDurations"
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
        loading={isProfilePrefLoading}
        error={isProfilePrefError}
      />
      {signupContext && <CompleteLaterButton />}
    </form>
  );
}
