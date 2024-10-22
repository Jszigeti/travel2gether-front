import { useParams } from "react-router-dom";
import StageInfoForm from "../../components/form/StageInfoForm";
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";
import ProtectEditRoute from "../../components/protectedRoutes/ProtectEditRoute";

export default function StageEditPage() {
  // USEPARAMS HOOK
  const params = useParams();

  return (
    <ProtectEditRoute>
      <Header
        pageTitle="Édition d'une étape"
        backLink={`/group/${params.groupId}/manage`}
      />
      <main>
        <StageInfoForm
          groupId={Number(params.groupId)}
          stageId={Number(params.stageId)}
          stageCreationContext={false}
        />
      </main>
      <Footer />
    </ProtectEditRoute>
  );
}
