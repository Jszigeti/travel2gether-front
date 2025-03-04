import ProfileComponent from "../../components/profilePages/ProfileComponent";
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import { useContext } from "react";
import AuthContext from "../../hooks/context/auth.context";

export default function MyProfilePage() {
  // RETRIEVE USER ID
  const { user } = useContext(AuthContext);

  if (!user)
    return (
      <>
        <Header pageTitle="Erreur" backLink="/" />
        <div className="text-red-500 text-center">
          Erreur lors du chargement des données
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Header pageTitle="Mon profil" backLink="/" />
      <main className="flex flex-col px-5 xl:px-0 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        <ProfileComponent myProfileContext={true} userId={user.id} />
      </main>
      <Footer />
    </>
  );
}
