// REACT HOOKS
import { useState } from "react";

// ROUTER
import { NavLink } from "react-router-dom";

// INTERFACES
import { ProfileInterface } from "../../interfaces/Profile";

// COMPONENTS
import { SignupForm } from "../../components/form/SignupForm";
import { ProfileInfoForm } from "../../components/form/ProfileInfoForm";
import { ProfilePrefForm } from "../../components/form/ProfilePrefForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function SignupPage() {
  // STATES
  const [view, setView] = useState(0);
  const [userId, setUserId] = useState<number>();
  const [profileData, setProfileData] = useState<ProfileInterface>();
  const [userToken, setUserToken] = useState<string | undefined>(undefined);

  // STATES FUNCTIONS
  const handleNext = () => {
    if (view < 2) setView((v) => v + 1);
  };

  const handleProfileData = (values: ProfileInterface) => {
    setProfileData(values);
  };

  const saveUserToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  return (
    <main className="mx-auto min-h-screen flex flex-col items-center justify-center relative">
      <NavLink to="/" className="absolute top-5 left-5 text-blue">
        <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
        <span className="ml-4 hidden md:inline font-bold">
          Retour à la page d'accueil
        </span>
      </NavLink>
      {view === 0 ? (
        <SignupForm
          onNext={handleNext}
          onUserId={setUserId}
          onUserToken={setUserToken}
        />
      ) : view === 1 ? (
        <ProfileInfoForm
          onNext={handleNext}
          onProfileData={handleProfileData}
          token={userToken}
          saveUserToken={saveUserToken}
        />
      ) : (
        <ProfilePrefForm
          profileData={profileData}
          formUserId={userId}
          token={userToken}
          saveUserToken={saveUserToken}
        />
      )}
    </main>
  );
}
