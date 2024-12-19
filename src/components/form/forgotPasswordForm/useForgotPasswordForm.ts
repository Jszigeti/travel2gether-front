// Router
import { useNavigate } from "react-router-dom";

// Axios functions
import { useAuthApi } from "../../../api/auth";

// Formik + Yup
import { useFormik } from "formik";
import { object, string } from "yup";

// Components
import { toast } from "react-toastify";

const useForgotPasswordForm = () => {
  // Import signup function
  const { forgotPassword } = useAuthApi();

  // Import useNavigate
  const navigate = useNavigate();

  // Form logic
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: object({
      email: string().email("Email invalide").required("Email requis"),
    }),
    onSubmit: async (values) => {
      try {
        await forgotPassword(values);
        toast.success(
          "Un email avec les instructions vient de vous être envoyé"
        );
        formik.resetForm();
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        navigate("/signin");
      }
    },
  });

  return {
    formik,
  };
};

export default useForgotPasswordForm;
