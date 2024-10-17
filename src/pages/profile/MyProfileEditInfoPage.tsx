import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import { ProfileInfoForm } from "../../components/form/ProfileInfoForm";

export default function MyProfileEditInfoPage() {
  return (
    <>
      <Header pageTitle="Mes infos" backLink="/my-profile/edit" />
      <main className="flex flex-col px-5 xl:px-0 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        <ProfileInfoForm signupContext={false} />
      </main>
      <Footer />
    </>
  );
}
