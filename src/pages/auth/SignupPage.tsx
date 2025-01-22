// REACT HOOKS
import { useState } from "react";

// ROUTER
import { NavLink } from "react-router-dom";

// COMPONENTS
import { SignupForm } from "../../components/form/signupForm/SignupForm";
import { ProfileInfoForm } from "../../components/form/profileInfoForm/ProfileInfoForm";
import { ProfilePrefForm } from "../../components/form/profilePrefForm/ProfilePrefForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Card } from "@material-tailwind/react";

export default function SignupPage() {
  // STATES
  const [view, setView] = useState(0);

  // STATES FUNCTIONS
  const handleNext = () => {
    if (view < 2) setView((v) => v + 1);
  };

  return (
    <main className="mx-auto min-h-screen flex flex-col items-center justify-center relative">
      <NavLink to="/" className="absolute top-5 left-5 text-blue">
        <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
        <span className="ml-4 hidden md:inline font-bold">
          Retour à la page d'accueil
        </span>
      </NavLink>
      <Card color="transparent" shadow={false} className="flex flex-col gap-6">
        <h1 className="text-center text-black">
          {view === 0
            ? "Créer mon compte"
            : view === 1
            ? "Mon profil"
            : "Mes préférences"}
        </h1>
        {view === 0 ? (
          <SignupForm onNext={handleNext} />
        ) : view === 1 ? (
          <ProfileInfoForm onNext={handleNext} />
        ) : (
          <ProfilePrefForm />
        )}
      </Card>
    </main>
  );
}
