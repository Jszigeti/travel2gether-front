import ProfileComponent from "../../components/profilePages/ProfileComponent";
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  // USEPARAMS HOOK
  const params = useParams();

  return (
    <>
      <Header pageTitle="Profil" backLink="/" />
      <main className="flex flex-col px-5 xl:px-0 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        <ProfileComponent userId={Number(params.userId)} />
      </main>
      <Footer />
    </>
  );
}
