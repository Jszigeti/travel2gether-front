// ROUTER
import { useParams } from "react-router-dom";
import ProtectGroupRoute from "../../components/protectedRoutes/ProtectGroupRoute";

// COMPONENTS
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";
import Checklist from "../../components/checklistPages/Checklist";

export default function StageChecklistPage() {
  // USEPARAMS HOOK
  const params = useParams();

  return (
    <ProtectGroupRoute>
      <Header
        pageTitle="Checklist"
        backLink={`/group/${params.groupId}/stage/${params.stageId}`}
      />
      <main className="flex flex-col justify-start items-center px-5 gap-6 py-6 max-w-screen-xl min-h-[70vh] mx-auto lg:gap-12">
        <Checklist
          groupId={Number(params.groupId)}
          stageId={Number(params.stageId)}
          stageCheckList={true}
        />
      </main>
      <Footer />
    </ProtectGroupRoute>
  );
}
