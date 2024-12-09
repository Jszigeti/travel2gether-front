// REACT HOOKS
import { ReactNode, useEffect, useState } from "react";

// ROUTER
import { Navigate, useParams } from "react-router-dom";

// REACT QUERY
import { useQuery } from "@tanstack/react-query";

// CONTEXT
import useAuthContext from "../../hooks/context/useAuthContext";

// AXIOS FUNCTION
import { getGroup } from "../../api/group";

// INTERFACES
import { GroupPageInterface } from "../../interfaces/Group";
import {
  GroupUserRoleEnum,
  GroupUserStatusEnum,
} from "../../interfaces/GroupUser";

// PROPS INTERFACE
interface ProtectEditRouteProps {
  editPage?: boolean;
  children: ReactNode;
}

export default function ProtectGroupRoute({
  editPage = false,
  children,
}: ProtectEditRouteProps) {
  // STATES
  const [redirect, setRedirect] = useState(false);

  // RETRIEVE USER FROM CONTEXT
  const { user } = useAuthContext();

  // USEPARAMS HOOK
  const params = useParams();

  // RETRIEVE GROUP DATA
  const { data: groupDetails } = useQuery<GroupPageInterface>({
    queryKey: ["groupDetails", Number(params.groupId)],
    queryFn: () =>
      params.groupId
        ? getGroup(Number(params.groupId))
        : Promise.reject(new Error("Group ID is required")),
  });

  useEffect(() => {
    if (groupDetails) {
      const userProfile = groupDetails.profiles.find(
        (profile) => profile.user_id === user?.userId
      );
      if (
        editPage &&
        (!userProfile ||
          userProfile.role.includes(GroupUserRoleEnum.TRAVELER) ||
          userProfile.status.includes(GroupUserStatusEnum.DENIED) ||
          userProfile.status.includes(GroupUserStatusEnum.PENDING))
      ) {
        setRedirect(true);
      } else if (
        !userProfile ||
        userProfile.status.includes(GroupUserStatusEnum.DENIED) ||
        userProfile.status.includes(GroupUserStatusEnum.PENDING)
      ) {
        setRedirect(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, groupDetails]);

  if (redirect) {
    return <Navigate to={`/group/${params.groupId}`} replace />;
  }

  return <>{children}</>;
}
