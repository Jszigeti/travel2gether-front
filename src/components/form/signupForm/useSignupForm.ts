// Axios functions
import { useAuthApi } from "../../../api/auth";

// Formik + Yup
import { useFormik } from "formik";
import { object, string, ref } from "yup";

// Components
import { toast } from "react-toastify";

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
      email: string().email("E-mail invalide").required("E-mail requis"),
      password: string()
        .required("Mot de passe requis")
        .min(8, "Au moins 8 caractères"),
      passwordmatch: string()
        .oneOf([ref("password"), ""], "Les mots de passe doivent correspondre")
        .required("Confirmation du mot de passe requise"),
      firstname: string().required("Prénom requis"),
      lastname: string().required("Nom requis"),
    }),
    onSubmit: async (values) => {
      const userData = {
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        password: values.password,
      };
      try {
        await signup(userData);
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
