import { useParams } from "react-router-dom";
import StageInfoForm from "../../components/form/StageInfoForm";
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";

export default function StageEditPage() {
  // ROUTER
  const params = useParams();
  return (
    <div>
      <Header
        pageTitle="Édition d'une étape"
        backLink={`/group/${params.groupId}/manage`}
      />
      <StageInfoForm
        groupId={Number(params.groupId)}
        stageId={Number(params.stageId)}
        stageCreationContext={false}
      />
      <Footer />
    </div>
  );
}
