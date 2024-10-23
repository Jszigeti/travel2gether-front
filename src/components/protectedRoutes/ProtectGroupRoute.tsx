// REACT HOOKS
import { ReactNode, useContext, useEffect, useState } from "react";

// ROUTER
import { Navigate, useParams } from "react-router-dom";

// REACT QUERY
import { useQuery } from "@tanstack/react-query";

// CONTEXT
import UserContext from "../../hooks/context/user.context";

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

  // RETRIEVE USER ID
  const { userId } = useContext(UserContext) || {};

  // USEPARAMS HOOK
  const params = useParams();

  // RETRIEVE GROUP DATA
  const { data: groupDetailsData } = useQuery<GroupPageInterface>({
    queryKey: ["groupDetails", Number(params.groupId)],
    queryFn: () =>
      params.groupId
        ? getGroup(Number(params.groupId))
        : Promise.reject(new Error("Group ID is required")),
  });

  useEffect(() => {
    if (groupDetailsData) {
      const userProfile = groupDetailsData.profiles.find(
        (profile) => profile.user_id === userId
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
  }, [userId, groupDetailsData]);

  if (redirect) {
    return <Navigate to={`/group/${params.groupId}`} replace />;
  }

  return <>{children}</>;
}
