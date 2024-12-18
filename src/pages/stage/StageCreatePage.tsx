import { useParams } from "react-router-dom";
import StageInfoForm from "../../components/form/StageInfoForm";
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";

export default function StageCreatePage() {
  // ROUTER
  const params = useParams();
  return (
    <div>
      <Header
        pageTitle="Création d'une étape"
        backLink={`/group/${params.groupId}`}
      />
      <StageInfoForm groupId={Number(params.groupId)} />
      <Footer />
    </div>
  );
}
