// ROUTER
import { useParams } from "react-router-dom";
import ProtectEditRoute from "../../components/protectedRoutes/ProtectEditRoute";

// COMPONENTS
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import GroupPrefForm from "../../components/form/GroupPrefForm";

export default function GroupEditPrefPage() {
  // USEPARAMS HOOK
  const params = useParams();

  return (
    <ProtectEditRoute>
      <Header
        pageTitle="Les préférences"
        backLink={`/group/${params.groupId}/edit`}
      />
      <main className="flex flex-col px-5 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        <GroupPrefForm
          groupCreationContext={false}
          paramsId={Number(params.groupId)}
        />
      </main>
      <Footer />
    </ProtectEditRoute>
  );
}
