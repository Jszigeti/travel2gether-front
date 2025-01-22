// Custom hook with form logic
import useSigninForm from "./useSigninForm";

// Components
import FormInput from "../formComponents/FormInput";
import { Button } from "@material-tailwind/react";

export default function SigninForm() {
  const { formik } = useSigninForm();
  return (
    <form
      className="w-80 max-w-screen-lg sm:w-96 flex flex-col gap-6"
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
          title="Mot de passe"
          name="password"
          inputType="password"
          formik={formik}
          placeholder="********"
        />
      </div>
      <Button className="bg-blue font-montserrat" fullWidth type="submit">
        Me connecter
      </Button>
    </form>
  );
}
