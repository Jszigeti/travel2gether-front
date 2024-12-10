// ROUTER
import { NavLink } from "react-router-dom";

// COMPONENTS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

// PROPS INTERFACE
interface StageButtonDisplayProps {
  stageId: string;
  groupId: string;
}

export default function StageButtonDisplay({
  stageId,
  groupId,
}: StageButtonDisplayProps) {
  return (
    <section className="fixed h-20 flex items-start pt-3 justify-around bottom-5 w-full">
      <NavLink to={`/group/${groupId}/stage/${stageId}/checklist`}>
        <FontAwesomeIcon
          icon={faListCheck}
          className="h-10 bg-blue p-4 rounded-full text-white shadow-xl"
        />
      </NavLink>
    </section>
  );
}
