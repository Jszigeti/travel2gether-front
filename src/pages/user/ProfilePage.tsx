import ProfileComponent from "../../components/ProfileComponent";
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";

export default function ProfilePage() {
  return (
    <>
      <Header pageTitle="Profil" backLink="/" />
      <main className="flex flex-col px-5 xl:px-0 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        <ProfileComponent />
      </main>
      <Footer />
    </>
  );
}
