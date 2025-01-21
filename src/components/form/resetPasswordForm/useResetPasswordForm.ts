import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string, ref } from "yup";
import { useAuthApi } from "../../../api/auth";
import { passwordRegex } from "../../../utils/regex";

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
