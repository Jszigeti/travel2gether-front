import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string, ref } from "yup";
import { useAuthApi } from "../../../api/auth";

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
      oldPassword: string()
        .required("Mot de passe requis")
        .min(8, "Au moins 8 caractères"),
      password: string()
        .required("Mot de passe requis")
        .min(8, "Au moins 8 caractères"),
      passwordmatch: string()
        .oneOf([ref("password"), ""], "Les mots de passe doivent correspondre")
        .required("Confirmation du mot de passe requise"),
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
