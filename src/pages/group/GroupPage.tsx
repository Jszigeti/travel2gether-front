// REACT HOOKS
import { useContext, useEffect, useState } from "react";

// REACT QUERY
import { useQuery, useQueryClient } from "@tanstack/react-query";

// CONTEXT
import UserContext from "../../hooks/context/user.context";

// AXIOS FUNCTIONS
import { addUserToGroup, deleteUserFromGroup, getGroup } from "../../api/group";

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

export default function GroupPage() {
  // STATES
  const [userRole, setUserRole] = useState<
    "NOT_MEMBER" | "TRAVELER" | "ORGANIZER" | "AUTHOR"
  >("NOT_MEMBER");
  const [userStatus, setUserStatus] = useState<
    "NOT_MEMBER" | "PENDING" | "ACCEPTED" | "DENIED"
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
    if (groupDetailsData && userId) {
      retrieveUserRole(groupDetailsData, userId, setUserRole);
      retrieveUserStatus(groupDetailsData, userId, setUserStatus);
    }
  }, [userId, groupDetailsData]);

  // LEAVING GROUP FUNCTION
  const handleLeavingGroup = async () => {
    if (userId) {
      try {
        setError(null);
        const response = await deleteUserFromGroup(
          Number(params.groupId),
          userId
        );
        console.log("Groupe quitté", response);
        queryClient.invalidateQueries({
          queryKey: ["groupDetails", Number(params.groupId)],
        });
        navigate("/");
      } catch (errors: unknown) {
        if (errors instanceof Error) {
          setError(errors.message);
        } else {
          setError("Une erreur est survenue");
        }
        console.log(errors);
      }
    }
  };

  // JOIN GROUP REQUEST FUNCTION
  const handleRequestGroup = async () => {
    if (userId) {
      try {
        const response = await addUserToGroup(Number(params.groupId), userId);
        console.log("Demande envoyée", response);
        setUserStatus("PENDING");
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Une erreur inconnue est survenue");
        }
        console.log(error);
      }
    } else {
      navigate("/signin");
    }
  };

  if (!params.groupId || !groupDetailsData)
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
    <>
      <Header pageTitle={groupDetailsData.title} backLink="/" />
      {isGroupDetailsLoading && (
        <div className="text-blue text-center">Chargement des données...</div>
      )}
      {isGroupDetailsError && (
        <div className="text-red-500 text-center">
          Erreur lors du chargement des données
        </div>
      )}
      <GroupCoverDisplay
        groupDetails={groupDetailsData}
        userRole={userRole}
        userStatus={userStatus}
        groupId={params.groupId}
      />
      <main className="flex flex-col px-5 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        <GroupInfoDisplay groupDetails={groupDetailsData} />
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GroupStagesDisplay
            groupDetails={groupDetailsData}
            userRole={userRole}
            userStatus={userStatus}
            groupId={params.groupId}
          />
          <GroupMembersDisplay
            groupDetails={groupDetailsData}
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
        {error && (
          <div className="text-red-500 text-center">
            Une erreur est survenue
          </div>
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
