// REACT HOOKS
import { useEffect, useState } from "react";

// REACT QUERY
import { useQuery, useQueryClient } from "@tanstack/react-query";

// CONTEXT
import useAuthContext from "../../hooks/context/useAuthContext";

// AXIOS FUNCTIONS
import { useGroupApi } from "../../api/group";

// ROUTER
import { useNavigate, useParams } from "react-router-dom";

// INTERFACES
import { GroupPageInterface } from "../../interfaces/Group";

// UTILS FUNCTIONS
import {
  retrieveUserRole,
  retrieveUserStatus,
} from "../../utils/retrieveUserRole&Status";

// COMPONENTS
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";
import GroupCoverDisplay from "../../components/groupPage/GroupCoverDisplay";
import GroupInfoDisplay from "../../components/groupPage/GroupInfoDisplay";
import GroupStagesDisplay from "../../components/groupPage/GroupStagesDisplay";
import GroupMembersDisplay from "../../components/groupPage/GroupMembersDisplay";
import GroupMapDisplay from "../../components/groupPage/GroupMapDisplay";
import GroupButtonsDisplay from "../../components/groupPage/GroupButtonsDisplay";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

export default function GroupPage() {
  const { getGroup, joinGroup, leaveGroup } = useGroupApi();
  // STATES
  const [userRole, setUserRole] = useState<
    "NOT_MEMBER" | "TRAVELER" | "ORGANIZER" | "AUTHOR"
  >("NOT_MEMBER");
  const [userStatus, setUserStatus] = useState<
    "NOT_MEMBER" | "PENDING" | "ACCEPTED" | "DENIED"
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

  // RETRIEVE USER ROLE AND STATUS
  useEffect(() => {
    if (groupDetails && user) {
      retrieveUserRole(groupDetails, user.id, setUserRole);
      retrieveUserStatus(groupDetails, user.id, setUserStatus);
    }
  }, [user, groupDetails]);

  //LEAVING GROUP FUNCTION
  const handleLeavingGroup = async () => {
    if (user) {
      try {
        await leaveGroup(Number(params.groupId));
        queryClient.invalidateQueries({
          queryKey: ["groupDetails", Number(params.groupId)],
        });
        navigate("/");
      } catch (error: unknown) {
        if (error instanceof Error) toast.error(error.message);
      }
    }
  };

  //JOIN GROUP REQUEST FUNCTION
  const handleRequestGroup = async () => {
    if (user) {
      try {
        await joinGroup(Number(params.groupId));
        setUserStatus("PENDING");
      } catch (error: unknown) {
        if (error instanceof Error) toast.error(error.message);
      }
    } else {
      navigate("/signin");
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

  if (!groupDetails || isGroupDetailsLoading)
    return (
      <>
        <Header pageTitle="Chargement" backLink="/" />
        <div className="text-blue text-center">Chargement des données...</div>
        <Footer />
      </>
    );

  return (
    <>
      <Header pageTitle={groupDetails.title} backLink="/" />
      <GroupCoverDisplay
        groupDetails={groupDetails}
        userRole={userRole}
        userStatus={userStatus}
        groupId={params.groupId}
      />
      <main className="flex flex-col px-5 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        <GroupInfoDisplay groupDetails={groupDetails} />
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GroupStagesDisplay
            groupDetails={groupDetails}
            userRole={userRole}
            userStatus={userStatus}
            groupId={params.groupId}
          />
          <GroupMembersDisplay
            groupDetails={groupDetails}
            userRole={userRole}
            userStatus={userStatus}
          />
        </section>
        <GroupMapDisplay />
        {userRole === "NOT_MEMBER" && userStatus !== "DENIED" && (
          <Button
            className="bg-blue w-56 mx-auto"
            onClick={handleRequestGroup}
            disabled={userStatus === "PENDING"}
          >
            {userStatus === "PENDING"
              ? "Demande envoyée"
              : "Demander à rejoindre"}
          </Button>
        )}
        {(userRole === "TRAVELER" || userRole === "ORGANIZER") &&
          userStatus === "ACCEPTED" && (
            <Button
              className="bg-red-500 w-56 mx-auto"
              onClick={handleLeavingGroup}
            >
              Quitter le groupe
            </Button>
          )}
      </main>
      <GroupButtonsDisplay
        userRole={userRole}
        userStatus={userStatus}
        groupId={params.groupId}
      />
      <Footer />
    </>
  );
}
