// REACT QUERY
import { useQueryClient } from "@tanstack/react-query";

// ROUTER
import { NavLink } from "react-router-dom";

// AXIOS FUNCTIONS
import { useGroupApi } from "../../api/group";

// INTERFACES
import { GroupPageInterface } from "../../interfaces/Group";
import { GroupUserStatusEnum } from "../../interfaces/GroupUser";

// COMPONENTS
import { Avatar } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

// PROPS INTERFACE
interface GroupManageRequestsDiplayProps {
  groupId: number;
  groupDetails: GroupPageInterface;
}

export default function GroupManageRequestsDisplay({
  groupId,
  groupDetails,
}: GroupManageRequestsDiplayProps) {
  const { acceptUserGroupRequest, kickUserFromGroup } = useGroupApi();

  // QUERY CLIENT DECLARATION
  const queryClient = useQueryClient();

  // RETRIEVE PENDING USERS
  const pendingUsers = groupDetails.profiles.filter((profile) =>
    profile.status.includes(GroupUserStatusEnum.PENDING)
  );

  // REQUEST FUNCTIONS
  const handleAcceptedRequest = async (userId: number) => {
    try {
      await acceptUserGroupRequest(groupId, userId);
      queryClient.invalidateQueries({ queryKey: ["groupDetails", groupId] });
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const handleDeniedRequest = async (userId: number) => {
    try {
      await kickUserFromGroup(groupId, userId);
      queryClient.invalidateQueries({ queryKey: ["groupDetails", groupId] });
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <section className="flex flex-col gap-3 w-full shadow-md p-4 rounded-md h-fit">
      <h2 className="text-center">Les demandes</h2>
      <div className="flex flex-col gap-3">
        {pendingUsers.map((pendingUser) => (
          <div
            className="flex items-center justify-between gap-3"
            key={pendingUser.userId}
          >
            <NavLink
              to={`/profile/${pendingUser.userId}`}
              className="flex items-center gap-3"
            >
              <Avatar
                src={
                  pendingUser.pathPicture
                    ? `${import.meta.env.VITE_API_BASE_URL}${
                        pendingUser.pathPicture
                      }`
                    : "/assets/avatar/avatar.svg"
                }
                alt="Avatar du membre"
                size="sm"
              />
              <p>{pendingUser.firstname}</p>
            </NavLink>
            <div className="flex gap-10">
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faCheck}
                onClick={() => handleAcceptedRequest(pendingUser.userId)}
              />
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faX}
                onClick={() => handleDeniedRequest(pendingUser.userId)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
