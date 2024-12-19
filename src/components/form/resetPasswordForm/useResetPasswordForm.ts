import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string, ref } from "yup";
import { useAuthApi } from "../../../api/auth";

const useResetPasswordForm = () => {
  // Import reset password function
  const { resetPassword } = useAuthApi();

  // Redirection
  const navigate = useNavigate();

  // Useparams hook
  const { userId, resetToken } = useParams();

  // Form logic
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordmatch: "",
    },
    validationSchema: object({
      password: string()
        .required("Mot de passe requis")
        .min(8, "Au moins 8 caractères"),
      passwordmatch: string()
        .oneOf([ref("password"), ""], "Les mots de passe doivent correspondre")
        .required("Confirmation du mot de passe requise"),
    }),
    onSubmit: async (values) => {
      if (userId && resetToken) {
        try {
          await resetPassword(userId, resetToken, values.password);
          toast.success(
            "Votre mot de passe a été réinitialisé avec succès, vous pouvez maintenant vous connecté !"
          );
          navigate("/signin");
          formik.resetForm();
        } catch {
          toast.error(
            "Une erreur est survenue, un nouveau mail vient de vous être envoyé."
          );
        } finally {
          navigate("/signin");
        }
      } else {
        toast.error("Une erreur est survenue, veuillez réessayer.");
        navigate("/signin");
      }
    },
  });

  return { formik };
};

export default useResetPasswordForm;
