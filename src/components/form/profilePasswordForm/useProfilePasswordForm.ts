import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string, ref } from "yup";
import { useAuthApi } from "../../../api/auth";
import { passwordRegex } from "../../../utils/regex";

const useProfilePasswordForm = () => {
  // Import signup function
  const { editUser } = useAuthApi();

  // REDIRECTION
  const navigate = useNavigate();

  // FORM LOGIC
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      passwordmatch: "",
    },
    validationSchema: object({
      oldPassword: string().required("Mot de passe requis"),
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
      const body = {
        oldPassword: values.oldPassword,
        password: values.password,
      };
      try {
        await editUser(body);
        navigate("/my-profile/edit");
        toast.success("Votre mot de passe a été édité avec succès !");
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

export default useProfilePasswordForm;
