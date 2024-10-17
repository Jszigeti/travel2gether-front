import MyProfileEditComponent from "../../components/MyProfileEditComponent";
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";

export default function MyProfileEditPage() {
  return (
    <>
      <Header pageTitle="Paramètres du profil" backLink="/" />
      <main className="flex flex-col justify-between items-center px-5 gap-6 py-6 max-w-screen-xl min-h-[70vh] mx-auto lg:gap-12 mt-40">
        <MyProfileEditComponent />
      </main>
      <Footer />
    </>
  );
}
