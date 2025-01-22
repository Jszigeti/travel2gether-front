// Custom hook with form logic
import useForgotPasswordForm from "./useForgotPasswordForm";

// Components
import FormInput from "../formComponents/FormInput";
import { Button } from "@material-tailwind/react";

export default function ForgotPasswordForm() {
  const { formik } = useForgotPasswordForm();

  return (
    <form
      className="w-80 max-w-screen-lg sm:w-96 flex flex-col gap-6"
      onSubmit={formik.handleSubmit}
    >
      <FormInput
        title="Email"
        name="email"
        formik={formik}
        placeholder="jean.dupont@gmail.com"
      />
      <Button className="bg-blue font-montserrat" fullWidth type="submit">
        Me renvoyer mon mot de passe
      </Button>
    </form>
  );
}
