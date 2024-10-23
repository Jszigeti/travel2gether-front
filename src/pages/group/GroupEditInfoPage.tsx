// ROUTER
import { useParams } from "react-router-dom";
import ProtectGroupRoute from "../../components/protectedRoutes/ProtectGroupRoute";

// COMPONENTS
import GroupInfoForm from "../../components/form/GroupInfoForm";
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";

export default function GroupEditInfoPage() {
  // USEPARAMS HOOK
  const params = useParams();

  return (
    <ProtectGroupRoute editPage={true}>
      <Header
        pageTitle="Les informations"
        backLink={`/group/${params.groupId}/edit`}
      />
      <main className="flex flex-col px-5 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        <GroupInfoForm
          groupCreationContext={false}
          paramsId={Number(params.groupId)}
        />
      </main>
      <Footer />
    </ProtectGroupRoute>
  );
}
