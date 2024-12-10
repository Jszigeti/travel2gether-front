// REACT HOOKS
import { useEffect, useState } from "react";

// REACT QUERY
import { useQuery, useQueryClient } from "@tanstack/react-query";

// CONTEXT
import useAuthContext from "../../hooks/context/useAuthContext";

// ROUTER
import { useNavigate } from "react-router-dom";

// AXIOS FUNCTIONS
import { useAuthApi } from "../../api/auth";

// FORMIK + YUP
import { useFormik } from "formik";
import { object, string } from "yup";

// INTERFACES
import { UserInterface } from "../../interfaces/User";

// UTILS FUNCTIONS
import { capitalizeFirstLetters } from "../../utils/capitalizeFirstLetter";

// COMPONENTS
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { ProfileInterface } from "../../interfaces/Profile";

export function ProfileAccountForm() {
  // STATES
  const [error, setError] = useState<null | string>(null);

  // Import signup function
  const { getUser, editUser } = useAuthApi();

  // RETRIEVE USER FROM CONTEXT
  const { user } = useAuthContext();

  // REDIRECTION
  const navigate = useNavigate();

  // QUERY CLIENT DECLARATION
  const queryClient = useQueryClient();

  // RETRIEVE PROFIL INFO DATA
  const {
    data: profileAccount,
    isLoading: isProfileAccountLoading,
    isError: isProfileAccountError,
  } = useQuery<UserInterface & ProfileInterface>({
    queryKey: ["profileAccount", user?.id],
    queryFn: () => (user ? getUser(user.id) : Promise.reject(error)),
  });

  // FORM LOGIC
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
      if (user) {
        try {
          setError(null);
          const response = await editUser(user.id, values);
          console.log("Modification des informations réussie", response);
          queryClient.setQueryData(["profileAccount", user], values);
          queryClient.invalidateQueries({
            queryKey: ["profileData", user],
          });
          navigate("/my-profile/edit");
          formik.resetForm();
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Une erreur inconnue est survenue");
          }
          console.log(error);
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

  return (
    <Card
      color="transparent"
      shadow={false}
      className="flex justify-center items-center text-black"
    >
      <form
        className="mt-6 mb-6 w-80 max-w-screen-lg sm:w-96"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">E-mail</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            type="email"
            placeholder="marie.diana@gmail.com"
            className={`!border-blue  ${
              formik.touched.email && formik.errors.email
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={formik.handleChange}
            name="email"
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.email && formik.touched.email && (
            <div className="mt-1 text-red-500">{formik.errors.email}</div>
          )}
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Prénom</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            placeholder="Prénom"
            className={`!border-blue  ${
              formik.touched.firstname && formik.errors.firstname
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e) => {
              formik.setFieldValue(
                "firstname",
                capitalizeFirstLetters(e.target.value)
              );
            }}
            name="firstname"
            value={formik.values.firstname}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.firstname && formik.touched.firstname && (
            <div className="mt-1 text-red-500">{formik.errors.firstname}</div>
          )}
        </div>
        <div className="flex flex-col mb-6 relative">
          <Typography variant="h6">Nom</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            placeholder="Nom"
            className={`!border-blue  ${
              formik.touched.lastname && formik.errors.lastname
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e) => {
              formik.setFieldValue(
                "lastname",
                capitalizeFirstLetters(e.target.value)
              );
            }}
            name="lastname"
            value={formik.values.lastname}
          />
          {formik.touched.lastname && formik.errors.lastname ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.lastname && formik.touched.lastname && (
            <div className="mt-1 text-red-500">{formik.errors.lastname}</div>
          )}
        </div>

        <Button
          size="md"
          fullWidth
          className="bg-blue font-montserrat"
          type="submit"
        >
          Valider
        </Button>
        {error && (
          <div className="text-red-500 text-center ">
            Erreur lors de la mise à jour du compte
          </div>
        )}
        {isProfileAccountLoading && (
          <div className="text-blue text-center">Chargement des données...</div>
        )}
        {isProfileAccountError && (
          <div className="text-red-500 text-center">
            Erreur lors du chargement des données
          </div>
        )}
      </form>
    </Card>
  );
}
