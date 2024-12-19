import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import { ProfileAccountForm } from "../../components/form/profileAccountForm/ProfileAccountForm";
import { NavLink } from "react-router-dom";
import { Card } from "@material-tailwind/react";

export default function MyProfileEditAccountPage() {
  return (
    <>
      <Header pageTitle="Mon compte" backLink="/my-profile/edit" />
      <main className="flex flex-col px-5 xl:px-0 gap-6 items-center py-6 max-w-screen-xl mx-auto lg:gap-12">
        <Card
          color="transparent"
          shadow={false}
          className="flex justify-center items-center text-black"
        >
          <ProfileAccountForm />
        </Card>
        <div>
          <NavLink
            className="text-blue font-bold text-center"
            to="/my-profile/edit/password"
          >
            Modifier mon mot de passe
          </NavLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
