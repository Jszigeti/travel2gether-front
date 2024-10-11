import { SignupForm } from "../../components/SignupForm";
import { ProfileForm } from "../../components/ProfileForm";
import { ProfileContForm } from "../../components/ProfileContForm";
import { useState } from "react";
export interface ProfileDataParams {
  path_picture: string;
  gender: Array<string>;
  description: string;
  interests: Array<string>;
  spoken_languages: Array<string>;
}
export default function SignupPage() {
  const [view, setView] = useState(0);
  const [profileData, setProfileData] = useState<ProfileDataParams>();
  function handleNext() {
    if (view < 2) setView((v) => v + 1);
  }

  function handleProfileData(values: ProfileDataParams) {
    setProfileData(values);
  }

  return (
    <main>
      {view === 0 ? (
        <SignupForm onNext={handleNext} />
      ) : view === 1 ? (
        <ProfileForm onNext={handleNext} onProfileData={handleProfileData} />
      ) : (
        <ProfileContForm profileData={profileData} />
      )}
    </main>
  );
}
