// ROUTER
import { NavLink, useParams } from "react-router-dom";
import ProtectEditRoute from "../../components/protectedRoutes/ProtectEditRoute";

// COMPONENTS
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import { Button } from "@material-tailwind/react";

export default function GroupeEditPage() {
  // USEPARAMS HOOK
  const params = useParams();

  return (
    <ProtectEditRoute>
      <Header pageTitle="Edition" backLink={`/group/${params.groupId}`} />
      <main className="flex flex-col justify-center items-center px-5 gap-6 py-6 max-w-screen-xl min-h-[70vh] mx-auto lg:gap-12">
        <NavLink to={`/group/${params.groupId}/edit/info`}>
          <Button className="bg-blue">Editer les informations</Button>
        </NavLink>
        <NavLink to={`/group/${params.groupId}/edit/pref`}>
          <Button className="bg-blue">Editer les préférences</Button>
        </NavLink>
      </main>
      <Footer />
    </ProtectEditRoute>
  );
}
