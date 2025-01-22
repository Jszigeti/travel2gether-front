import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import { ProfileInfoForm } from "../../components/form/profileInfoForm/ProfileInfoForm";
import { Card } from "@material-tailwind/react";

export default function MyProfileEditInfoPage() {
  return (
    <>
      <Header pageTitle="Mes infos" backLink="/my-profile/edit" />
      <main className="flex flex-col px-5 xl:px-0 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        <Card
          color="transparent"
          shadow={false}
          className="mt-6 mb-6 flex justify-center items-center text-black "
        >
          <ProfileInfoForm signupContext={false} />
        </Card>
      </main>
      <Footer />
    </>
  );
}
