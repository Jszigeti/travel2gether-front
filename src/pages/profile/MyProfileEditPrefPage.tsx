import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import { ProfilePrefForm } from "../../components/form/ProfilePrefForm";

export default function MyProfileEditPrefPage() {
  return (
    <>
      <Header pageTitle="Mes préférences" backLink="/my-profile/edit" />
      <main className="flex flex-col px-5 xl:px-0 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        <ProfilePrefForm signupContext={false} />
      </main>
      <Footer />
    </>
  );
}
