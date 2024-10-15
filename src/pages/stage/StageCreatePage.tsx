import StageCreateForm from "../../components/form/StageCreateForm";
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";

export default function StageCreatePage() {
  return (
    <div>
      <Header pageTitle="Création d'une étape" backLink="/group/:groupId" />
      <StageCreateForm />
      <Footer />
    </div>
  );
}
