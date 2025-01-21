// Router
import { useNavigate } from "react-router-dom";

// Axios functions
import { useAuthApi } from "../../../api/auth";

// Context
import useAuthContext from "../../../hooks/context/useAuthContext";

// Formik + Yup
import { useFormik } from "formik";
import { object, string } from "yup";

// Components
import { toast } from "react-toastify";
import { mailRegex } from "../../../utils/regex";

const useSigninForm = () => {
  // Retrieve login function from context
  const { login } = useAuthContext();

  // Import signin function
  const { signin } = useAuthApi();

  // Redirection
  const navigate = useNavigate();

  // Form logic
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: object({
      email: string()
        .email()
        .required("Email requis")
        .matches(mailRegex, "Email invalide"),
      password: string().required("Mot de passe requis"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await signin(values);
        console.log("Connexion réussie", response);
        login(response.user.id, response.user.pathPicture);
        navigate(`/`);
        toast.success("Ravi de vous revoir !");
        formik.resetForm();
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    },
  });

  return {
    formik,
  };
};

export default useSigninForm;
