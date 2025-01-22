// Axios functions
import { useAuthApi } from "../../../api/auth";

// Formik + Yup
import { useFormik } from "formik";
import { object, string, ref } from "yup";

// Components
import { toast } from "react-toastify";
import { mailRegex, passwordRegex } from "../../../utils/regex";

// Props interface
interface IUseSignupForm {
  onNext: () => void;
}

const useSignupForm = ({ onNext }: IUseSignupForm) => {
  // Import signup function
  const { signup } = useAuthApi();

  // Form logic
  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      passwordmatch: "",
    },
    validationSchema: object({
      email: string()
        .email()
        .required("Email requis")
        .matches(mailRegex, "Email invalide"),
      firstname: string().required("Prénom requis"),
      lastname: string().required("Nom requis"),
      password: string()
        .required("Mot de passe requis")
        .matches(
          passwordRegex,
          "Minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
        ),
      passwordmatch: string()
        .oneOf([ref("password")], "Les mots de passe ne correspondent pas")
        .required("Confirmation du mot de passe requise")
        .matches(passwordRegex),
    }),
    onSubmit: async (values) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordmatch, ...rest } = values;
      try {
        await signup(rest);
        onNext();
        formik.resetForm();
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    },
  });

  return { formik };
};

export default useSignupForm;
