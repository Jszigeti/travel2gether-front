import ProfileComponent from "../../components/ProfileComponent";
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";

export default function MyProfilePage() {
  return (
    <>
      <Header pageTitle="Mon profil" backLink="/" />
      <main className="flex flex-col px-5 xl:px-0 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        <ProfileComponent myProfileContext={true} />
      </main>
      <Footer />
    </>
  );
}
