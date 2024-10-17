// REACT HOOKS
import { useState } from "react";

// ROUTER
import { NavLink } from "react-router-dom";

// COMPONENTS
import { SignupForm } from "../../components/form/SignupForm";
import { ProfileInfoForm } from "../../components/form/ProfileInfoForm";
import { ProfilePrefForm } from "../../components/form/ProfilePrefForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ProfileInterface } from "../../interfaces/Profile";

export default function SignupPage() {
  // STATES
  const [view, setView] = useState(0);
  const [userId, setUserId] = useState<number>();
  const [profileData, setProfileData] = useState<ProfileInterface>();

  // STATES FUNCTIONS
  function handleNext() {
    if (view < 2) setView((v) => v + 1);
  }

  function handleProfileData(values: ProfileInterface) {
    setProfileData(values);
  }

  return (
    <main className="mx-auto min-h-screen flex flex-col items-center justify-center relative">
      <NavLink to="/" className="absolute top-5 left-5 text-blue">
        <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
        <span className="ml-4 hidden md:inline font-bold">
          Retour à la page d'accueil
        </span>
      </NavLink>
      {view === 0 ? (
        <SignupForm onNext={handleNext} onUserId={setUserId} />
      ) : view === 1 ? (
        <ProfileInfoForm
          onNext={handleNext}
          onProfileData={handleProfileData}
          userId={userId}
        />
      ) : (
        <ProfilePrefForm profileData={profileData} paramsId={userId} />
      )}
    </main>
  );
}
