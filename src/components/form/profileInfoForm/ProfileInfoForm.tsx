// Custom hook with form logic
import useProfileInfoForm from "./useProfileInfoForm";

// Form data
import {
  interestsOptions,
  profileGenderOptions,
  spokenLanguagesOptions,
} from "../../../data/formOptions";

// Components
import AvatarInput from "../formComponents/AvatarInput/AvatarInput";
import FormInput from "../formComponents/FormInput";
import SelectInput from "../formComponents/SelectInput";
import TextAreaInput from "../formComponents/TextAreaInput";
import DisplayLoadingAndErrorMessages from "../../UI/DisplayLoadingAndErrorMessages";
import CompleteLaterButton from "../formComponents/CompleteLaterButton";
import { Button } from "@material-tailwind/react";

// Props interface
interface ProfileInfoFormProps {
  onNext?: () => void;
  signupContext?: boolean;
}

export function ProfileInfoForm({
  onNext,
  signupContext = true,
}: ProfileInfoFormProps) {
  const { formik, profileInfo, isProfileInfoLoading, isProfileInfoError } =
    useProfileInfoForm({ onNext, signupContext });

  return (
    <form
      className="w-80 max-w-screen-lg sm:w-96"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-3 mb-6">
        <AvatarInput formik={formik} pathPicture={profileInfo?.pathPicture} />
        <SelectInput
          title="Genre"
          label="votre genre"
          options={profileGenderOptions}
          formik={formik}
          fieldName="gender"
          multiple={false}
        />
        <FormInput
          title="Ma date de naissance"
          name="birthdate"
          inputType="date"
          formik={formik}
          placeholder="01/01/2000"
        />
        <TextAreaInput
          title="Bio"
          name="description"
          formik={formik}
          placeholder="Parlez nous de vous !"
        />
        <SelectInput
          title="Centres d'intérêt"
          label="vos centres d'intérêt"
          options={interestsOptions}
          formik={formik}
          fieldName="interests"
        />
        <SelectInput
          title="Langues parlées"
          label="vos langues parlées"
          options={spokenLanguagesOptions}
          formik={formik}
          fieldName="spokenLanguages"
        />
      </div>
      <Button
        size="md"
        fullWidth
        className="bg-blue font-montserrat"
        type="submit"
      >
        {signupContext ? "Suite" : "Valider"}
      </Button>
      <DisplayLoadingAndErrorMessages
        loading={isProfileInfoLoading}
        error={isProfileInfoError}
      />
      {signupContext && <CompleteLaterButton />}
    </form>
  );
}
