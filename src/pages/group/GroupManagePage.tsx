// REACT HOOKS
import { useContext, useEffect, useState } from "react";

// REACT QUERY
import { useQuery, useQueryClient } from "@tanstack/react-query";

// CONTEXT
import UserContext from "../../hooks/context/user.context";

// ROUTER
import { useNavigate, useParams } from "react-router-dom";
import ProtectGroupRoute from "../../components/protectedRoutes/ProtectGroupRoute";

// AXIOS FUNCTIONS
import { deleteGroup, getGroup } from "../../api/group";

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

export default function GroupManagePage() {
  // STATES
  const [userRole, setUserRole] = useState<
    "NOT_MEMBER" | "TRAVELER" | "ORGANIZER" | "AUTHOR"
  >("NOT_MEMBER");
  const [error, setError] = useState<null | string>(null);

  // RETRIEVE USER ID
  const { userId } = useContext(UserContext) || {};

  // USEPARAMS HOOK
  const params = useParams();

  // REDIRECTION
  const navigate = useNavigate();

  // QUERY CLIENT DECLARATION
  const queryClient = useQueryClient();

  // RETRIEVE GROUP DATA
  const {
    data: groupDetailsData,
    isLoading: isGroupDetailsDataLoading,
    isError: isGroupDetailsDataError,
  } = useQuery<GroupPageInterface>({
    queryKey: ["groupDetails", Number(params.groupId)],
    queryFn: () =>
      params.groupId
        ? getGroup(Number(params.groupId))
        : Promise.reject(new Error("Group ID is required")),
  });

  // RETRIEVE USER ROLE
  useEffect(() => {
    if (groupDetailsData && userId)
      retrieveUserRole(groupDetailsData, userId, setUserRole);
  }, [userId, groupDetailsData]);

  const handleDeleteGroup = async () => {
    try {
      setError(null);
      const response = await deleteGroup(Number(params.groupId));
      console.log("Groupe supprimé", response);
      queryClient.invalidateQueries({
        queryKey: ["groupDetails", Number(params.groupId)],
      });
      navigate(`/`);
    } catch (errors: unknown) {
      if (errors instanceof Error) {
        setError(errors.message);
      } else {
        setError("Une erreur est survenue");
      }
      console.log(errors);
    }
  };

  if (
    !params.groupId ||
    !groupDetailsData ||
    isGroupDetailsDataError ||
    !userId
  )
    return (
      <>
        <Header pageTitle="Erreur" backLink="/" />
        <div className="text-red-500 text-center">
          Erreur lors du chargement des données
        </div>
        <Footer />
      </>
    );

  return (
    <ProtectGroupRoute editPage={true}>
      <Header pageTitle="Gestion" backLink={`/group/${params.groupId}`} />
      <main className="flex flex-col justify-center items-center px-5 gap-6 py-6 max-w-screen-xl min-h-[70vh] mx-auto lg:gap-12">
        <section className="grid gap-6 w-full lg:grid-cols-4">
          {isGroupDetailsDataLoading && (
            <div className="text-blue text-center">
              Chargement des données...
            </div>
          )}
          <GroupManageRequestsDisplay
            groupId={Number(params.groupId)}
            groupDetailsData={groupDetailsData}
          />
          <GroupManageMembersDisplay
            userId={userId}
            groupId={Number(params.groupId)}
            groupDetailsData={groupDetailsData}
          />
          <GroupManageStagesDisplay
            groupDetailsData={groupDetailsData}
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
        {error && (
          <div className="text-red-500 text-center ">
            Erreur lors de la suppression du groupe
          </div>
        )}
      </main>
      <Footer />
    </ProtectGroupRoute>
  );
}
