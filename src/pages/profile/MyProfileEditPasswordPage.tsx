import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import { ProfilePasswordForm } from "../../components/form/ProfilePasswordForm";

export default function MyProfileEditPasswordPage() {
  return (
    <>
      <Header
        pageTitle="Mon mot de passe"
        backLink="/my-profile/edit/account"
      />
      <main className="flex flex-col px-5 xl:px-0 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        <ProfilePasswordForm />
      </main>
      <Footer />
    </>
  );
}
