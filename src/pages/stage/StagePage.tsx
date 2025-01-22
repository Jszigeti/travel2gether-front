// REACT QUERY
import { useQuery } from "@tanstack/react-query";

// AXIOS FUNCTIONS
import { getStageFromGroup } from "../../api/stage";

// ROUTER
import { useParams } from "react-router-dom";

// INTERFACES
import { StageInterface } from "../../interfaces/Stage";

// COMPONENTS
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";
import StageCoverDisplay from "../../components/stagePage/StageCoverDisplay";
import StageInfoDisplay from "../../components/stagePage/StageInfoDisplay";
import StageMapDisplay from "../../components/stagePage/StageMapDisplay";
import ProtectGroupRoute from "../../components/protectedRoutes/ProtectGroupRoute";
import StageButtonDisplay from "../../components/stagePage/StageButtonDisplay";

export default function StagePage() {
  // USEPARAMS HOOK
  const params = useParams();

  // RETRIEVE STAGE DATA
  const {
    data: stageDetailsData,
    isLoading: isStageDetailsLoading,
    isError: isStageDetailsError,
  } = useQuery<StageInterface>({
    queryKey: ["stageDetails", Number(params.stageId)],
    queryFn: () =>
      params.stageId
        ? getStageFromGroup(Number(params.groupId), Number(params.stageId))
        : Promise.reject(new Error("Stage ID is required")),
  });

  if (!params.stageId || !params.groupId || isStageDetailsError)
    return (
      <ProtectGroupRoute>
        <Header pageTitle="Erreur" backLink={`/group/${params.groupId}`} />
        <div className="text-red-500 text-center">
          Erreur lors du chargement des données
        </div>
        <Footer />
      </ProtectGroupRoute>
    );

  if (!stageDetailsData || isStageDetailsLoading)
    return (
      <ProtectGroupRoute>
        <Header pageTitle="Chargement" backLink={`/group/${params.groupId}`} />
        <div className="text-blue text-center">Chargement des données...</div>
        <Footer />
      </ProtectGroupRoute>
    );

  return (
    <ProtectGroupRoute>
      <Header
        pageTitle={stageDetailsData.title}
        backLink={`/group/${params.groupId}`}
      />
      <StageCoverDisplay stageDetails={stageDetailsData} />
      <main className="flex flex-col px-5 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        <StageInfoDisplay stageDetails={stageDetailsData} />
        <StageMapDisplay />
      </main>
      <StageButtonDisplay stageId={params.stageId} groupId={params.groupId} />
      <Footer />
    </ProtectGroupRoute>
  );
}
