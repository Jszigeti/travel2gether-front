import { useParams } from "react-router-dom";
import StageInfoForm from "../../components/form/StageInfoForm";
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";
import ProtectGroupRoute from "../../components/protectedRoutes/ProtectGroupRoute";

export default function StageEditPage() {
  // USEPARAMS HOOK
  const params = useParams();

  return (
    <ProtectGroupRoute editPage={true}>
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
    </ProtectGroupRoute>
  );
}
