import { useParams } from "react-router-dom";
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";
import Checklist from "../../components/UI/Checklist";
import ProtectGroupRoute from "../../components/protectedRoutes/ProtectGroupRoute";

export default function GroupChecklistPage() {
  // USEPARAMS HOOK
  const params = useParams();

  return (
    <ProtectGroupRoute>
      <Header pageTitle="Checklist" backLink={`/group/${params.groupId}`} />
      <main className="flex flex-col justify-between items-center px-5 gap-6 py-6 max-w-screen-xl min-h-[70vh] mx-auto lg:gap-12">
        <Checklist groupId={Number(params.groupId)} />
      </main>
      <Footer />
    </ProtectGroupRoute>
  );
}
