// ROUTER
import { NavLink } from "react-router-dom";

// INTERFACES
import { GroupPageInterface } from "../../interfaces/Group";

// COMPONENTS
import { Button } from "@material-tailwind/react";

// PROPS INTERFACE
interface GroupCoverDisplayProps {
  groupDetails: GroupPageInterface;
  userRole: string;
  userStatus: string;
  groupId: string;
}

export default function GroupCoverDisplay({
  groupDetails,
  userRole,
  userStatus,
  groupId,
}: GroupCoverDisplayProps) {
  return (
    <>
      <img
        src={groupDetails.pathPicture}
        alt="Photo du groupe"
        className="w-full xl:max-w-screen-xl xl:mx-auto max-h-[40rem] object-cover"
      />
      {(userRole === "AUTHOR" || userRole === "ORGANIZER") &&
        userStatus === "ACCEPTED" && (
          <div className="my-3 flex items-center justify-around gap-3 flex-col sm:flex-row">
            <NavLink to={`/group/${groupId}/edit`}>
              <Button className="w-56 bg-blue">Editer</Button>
            </NavLink>
            <NavLink to={`/group/${groupId}/manage`}>
              <Button className="w-56 bg-blue">Gérer</Button>
            </NavLink>
          </div>
        )}
    </>
  );
}
