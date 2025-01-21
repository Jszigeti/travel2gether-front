import ProfileComponent from "../../components/profilePages/ProfileComponent";
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import { useNavigate, useParams } from "react-router-dom";
import useAuthContext from "../../hooks/context/useAuthContext";

export default function ProfilePage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const params = useParams();

  if (Number(params.userId) === user?.id) navigate("/my-profile");

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
