// React hooks
import { useEffect } from "react";

// Router
import { useNavigate } from "react-router-dom";

// Axios functions
import { useAuthApi } from "../../../api/auth";

// Context
import useAuthContext from "../../../hooks/context/useAuthContext";

// React query
import { useQueryClient, useQuery } from "@tanstack/react-query";

// Formik + Yup
import { useFormik } from "formik";
import { object, string } from "yup";

// Interfaces
import { ProfileInterface } from "../../../interfaces/Profile";
import { UserInterface } from "../../../interfaces/User";

// Components
import { toast } from "react-toastify";

const useProfileAccountForm = () => {
  // Import getUser and editUser functions
  const { getUser, editUser } = useAuthApi();

  // Retrieve user from context
  const { user } = useAuthContext();

  // Redirection
  const navigate = useNavigate();

  // Query client declaration
  const queryClient = useQueryClient();

  // Retrieve profile account data
  const {
    data: profileAccount,
    isLoading: isProfileAccountLoading,
    isError: isProfileAccountError,
  } = useQuery<UserInterface & ProfileInterface>({
    queryKey: ["profileAccount", user?.id],
    queryFn: () => getUser(),
  });

  // Form logic
  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
    },
    validationSchema: object({
      email: string().email("E-mail invalide").required("E-mail requis"),
      firstname: string().required("Prénom requis"),
      lastname: string().required("Nom requis"),
    }),
    onSubmit: async (values) => {
      try {
        await editUser(values);
        queryClient.setQueryData(["profileAccount", user], values);
        queryClient.invalidateQueries({
          queryKey: ["profileData", user],
        });
        navigate("/my-profile/edit");
        toast.success("Vos informations ont été éditées avec succès !");
        formik.resetForm();
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    },
  });

  useEffect(() => {
    if (profileAccount) {
      formik.setValues({
        email: profileAccount.email || "",
        firstname: profileAccount.firstname || "",
        lastname: profileAccount.lastname || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileAccount]);

  return {
    formik,
    isProfileAccountLoading,
    isProfileAccountError,
  };
};

export default useProfileAccountForm;
