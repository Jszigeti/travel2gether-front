import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import { ProfilePasswordForm } from "../../components/form/profilePasswordForm/ProfilePasswordForm";
import { Card } from "@material-tailwind/react";

export default function MyProfileEditPasswordPage() {
  return (
    <>
      <Header
        pageTitle="Mon mot de passe"
        backLink="/my-profile/edit/account"
      />
      <main className="flex flex-col px-5 xl:px-0 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        <Card
          color="transparent"
          shadow={false}
          className="flex justify-center items-center text-black"
        >
          <ProfilePasswordForm />
        </Card>
      </main>
      <Footer />
    </>
  );
}
