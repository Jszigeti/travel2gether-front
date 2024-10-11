import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { object, string, ref } from "yup";

interface SignupFormProps {
  onNext: () => void;
}
export function SignupForm({ onNext }: SignupFormProps) {
  const formik = useFormik({
    initialValues: {
      email: "example@mail.com",
      firstname: "z",
      lastname: "x",
      password: "abcdefgh",
      passwordmatch: "abcdefgh",
    },
    validationSchema: object({
      email: string().email("Adresse email invalide").required("Email requis"),
      password: string()
        .required("Mot de passe requis")
        .min(8, "Au moins 8 caractères"),
      passwordmatch: string()
        .oneOf([ref("password"), ""], "Les mots de passe doivent correspondre")
        .required(),
      firstname: string().required("Prénom requis"),
      lastname: string().required("Nom requis"),
    }),
    onSubmit: (values) => {
      /*const newUser = {
        id: Date.now(),
        ...values,
      };
      onSigninFormData(newUser);*/
      console.log(values);
      onNext();
      formik.resetForm();
    },
  });

  return (
    <Card
      color="transparent"
      shadow={false}
      className="flex justify-center items-center min-h-screen text-black"
    >
      <Typography variant="h4" className="font-montserrat">
        Créer mon compte
      </Typography>
      <form
        className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Mon adresse mail</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            type="email"
            placeholder="name@email.com"
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
            <div>{formik.errors.email}</div>
          )}
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Mon prénom</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            placeholder="Insert title here"
            className={`!border-blue  ${
              formik.touched.firstname && formik.errors.firstname
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={formik.handleChange}
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
            <div>{formik.errors.firstname}</div>
          )}
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Mon nom de famille</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            placeholder="Insert title here"
            className={`!border-blue  ${
              formik.touched.lastname && formik.errors.lastname
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={formik.handleChange}
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
            <div>{formik.errors.lastname}</div>
          )}
        </div>
        <div className="flex flex-col mb-3 relative">
          <Typography variant="h6">Mot de passe</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            type="password"
            placeholder="Insert title here"
            className={`!border-blue  ${
              formik.touched.password && formik.errors.password
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={formik.handleChange}
            name="password"
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.password && formik.touched.password && (
            <div>{formik.errors.password}</div>
          )}
        </div>
        <div className="flex flex-col mb-6 relative">
          <Typography variant="h6">Confirmer le mot de passe</Typography>
          <Input
            crossOrigin={undefined}
            size="lg"
            type="password"
            placeholder="Insert title here"
            className={`!border-blue  ${
              formik.touched.email && formik.errors.email
                ? "!border-red-500"
                : null
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={formik.handleChange}
            name="passwordmatch"
            value={formik.values.passwordmatch}
          />
          {formik.touched.passwordmatch && formik.errors.passwordmatch ? (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="absolute right-3 top-[40px] text-red-500"
            />
          ) : null}
          {formik.errors.passwordmatch && formik.touched.passwordmatch && (
            <div>{formik.errors.passwordmatch}</div>
          )}
        </div>
        <Button
          size="md"
          fullWidth
          className="bg-blue font-montserrat"
          type="submit"
        >
          M'inscrire
        </Button>
        <Typography className="text-center font-normal  mt-6">
          Déjà inscrit ?{" "}
          <NavLink to="/signin" className="text-blue font-bold">
            Se connecter
          </NavLink>
        </Typography>
      </form>
    </Card>
  );
}
