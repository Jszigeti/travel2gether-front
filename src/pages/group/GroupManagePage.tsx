// REACT HOOKS
import { useEffect, useState } from "react";

// REACT QUERY
import { useQuery, useQueryClient } from "@tanstack/react-query";

// CONTEXT
import useAuthContext from "../../hooks/context/useAuthContext";

// ROUTER
import { useNavigate, useParams } from "react-router-dom";
import ProtectGroupRoute from "../../components/protectedRoutes/ProtectGroupRoute";

// AXIOS FUNCTIONS
import { useGroupApi } from "../../api/group";

// INTERFACES
import { GroupPageInterface } from "../../interfaces/Group";

// UTILS FUNCTIONS
import { retrieveUserRole } from "../../utils/retrieveUserRole&Status";

// COMPONENTS
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import GroupManageRequestsDisplay from "../../components/groupManagePage/GroupManageRequestsDiplay";
import GroupManageMembersDisplay from "../../components/groupManagePage/GroupManageMembersDisplay";
import GroupManageStagesDisplay from "../../components/groupManagePage/GroupManageStagesDisplay";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

export default function GroupManagePage() {
  const { deleteGroup, getGroup } = useGroupApi();

  // STATES
  const [userRole, setUserRole] = useState<
    "NOT_MEMBER" | "TRAVELER" | "ORGANIZER" | "AUTHOR"
  >("NOT_MEMBER");

  // RETRIEVE USER FROM CONTEXT
  const { user } = useAuthContext();

  // USEPARAMS HOOK
  const params = useParams();

  // REDIRECTION
  const navigate = useNavigate();

  // QUERY CLIENT DECLARATION
  const queryClient = useQueryClient();

  // RETRIEVE GROUP DATA
  const {
    data: groupDetails,
    isLoading: isGroupDetailsLoading,
    isError: isGroupDetailsError,
  } = useQuery<GroupPageInterface>({
    queryKey: ["groupDetails", Number(params.groupId)],
    queryFn: () =>
      params.groupId
        ? getGroup(Number(params.groupId))
        : Promise.reject(new Error("Group ID is required")),
  });

  // RETRIEVE USER ROLE
  useEffect(() => {
    if (groupDetails && user)
      retrieveUserRole(groupDetails, user.id, setUserRole);
  }, [user, groupDetails]);

  const handleDeleteGroup = async () => {
    try {
      await deleteGroup(Number(params.groupId));
      queryClient.invalidateQueries({
        queryKey: ["groupDetails", Number(params.groupId)],
      });
      navigate(`/`);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  if (!params.groupId || isGroupDetailsError)
    return (
      <>
        <Header pageTitle="Erreur" backLink="/" />
        <div className="text-red-500 text-center">
          Erreur lors du chargement des données
        </div>
        <Footer />
      </>
    );

  if (isGroupDetailsLoading || !groupDetails || !user)
    return (
      <>
        <Header pageTitle="Chargement" backLink="/" />
        <div className="text-blue text-center">Chargement des données...</div>
        <Footer />
      </>
    );

  return (
    <ProtectGroupRoute editPage={true}>
      <Header pageTitle="Gestion" backLink={`/group/${params.groupId}`} />
      <main className="flex flex-col justify-center items-center px-5 gap-6 py-6 max-w-screen-xl min-h-[70vh] mx-auto lg:gap-12">
        <section className="grid gap-6 w-full lg:grid-cols-4">
          <GroupManageRequestsDisplay
            groupId={Number(params.groupId)}
            groupDetails={groupDetails}
          />
          <GroupManageMembersDisplay
            userId={user.id}
            groupId={Number(params.groupId)}
            groupDetails={groupDetails}
          />
          <GroupManageStagesDisplay
            groupDetails={groupDetails}
            groupId={Number(params.groupId)}
          />
        </section>
        {userRole === "AUTHOR" && (
          <Button
            className="bg-red-500 w-56 mx-auto"
            onClick={handleDeleteGroup}
          >
            Supprimer le groupe
          </Button>
        )}
      </main>
      <Footer />
    </ProtectGroupRoute>
  );
}
