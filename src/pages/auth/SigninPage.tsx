// ROUTER
import { NavLink } from "react-router-dom";

// COMPONENTS
import SigninForm from "../../components/form/signinForm/SigninForm";
import { Card, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function SigninPage() {
  return (
    <main className="mx-auto min-h-screen flex flex-col items-center justify-center relative">
      <NavLink to="/" className="absolute top-5 left-5 text-blue">
        <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
        <span className="ml-4 hidden md:inline font-bold">
          Retour à la page d'accueil
        </span>
      </NavLink>
      <Card color="transparent" shadow={false} className="flex flex-col gap-6">
        <h1 className="text-center text-black">Me connecter</h1>
        <SigninForm />
        <Typography className="text-center font-bold text-blue ">
          <NavLink to="/forgot-password">Mot de passe oublié ?</NavLink>
        </Typography>
        <Typography color="gray" className="text-center font-normal ">
          Pas de compte ?{" "}
          <NavLink to="/signup" className="text-blue font-bold">
            S'inscrire
          </NavLink>
        </Typography>
      </Card>
    </main>
  );
}
