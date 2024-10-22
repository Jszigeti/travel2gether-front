// ROUTER
import { NavLink } from "react-router-dom";

// COMPONENTS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faEnvelope,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

// PROPS INTERFACE
interface GroupButtonsDisplayProps {
  userRole: string;
  userStatus: string;
  groupId: string;
}

export default function GroupButtonsDisplay({
  userRole,
  userStatus,
  groupId,
}: GroupButtonsDisplayProps) {
  return (
    <>
      {(userRole === "TRAVELER" ||
        userRole === "AUTHOR" ||
        userRole === "ORGANIZER") &&
        userStatus === "ACCEPTED" && (
          <section className="fixed h-20 flex items-start pt-3 justify-around bottom-5 w-full">
            <NavLink to={`/group/${groupId}/album`}>
              <FontAwesomeIcon
                icon={faImage}
                className="h-10 bg-blue p-4 rounded-full text-white shadow-xl"
              />
            </NavLink>
            <NavLink to={`/group/${groupId}/messages`}>
              <FontAwesomeIcon
                icon={faEnvelope}
                className="h-10 bg-blue p-4 rounded-full text-white shadow-xl"
              />
            </NavLink>
            <NavLink to={`/group/${groupId}/checklist`}>
              <FontAwesomeIcon
                icon={faListCheck}
                className="h-10 bg-blue p-4 rounded-full text-white shadow-xl"
              />
            </NavLink>
          </section>
        )}
    </>
  );
}
