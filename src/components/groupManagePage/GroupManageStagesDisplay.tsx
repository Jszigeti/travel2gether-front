// ROUTER
import { NavLink } from "react-router-dom";

// INTERFACES
import { GroupPageInterface } from "../../interfaces/Group";

// COMPONENTS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

// PROPS INTERFACE
interface GroupManageStagesDisplayProps {
  groupDetailsData: GroupPageInterface;
  groupId: number;
}

export default function GroupManageStagesDisplay({
  groupDetailsData,
  groupId,
}: GroupManageStagesDisplayProps) {
  return (
    <section className="flex flex-col gap-3 w-full shadow-md p-4 rounded-md h-fit">
      <h2 className="text-center">Les étapes</h2>
      <div className="flex flex-col gap-3">
        {groupDetailsData?.stages?.map((stage) => (
          <div className="flex gap-3 justify-between" key={stage.id}>
            <p>{stage.title}</p>
            <NavLink to={`/group/${groupId}/stage/${stage.id}/edit`}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  );
}
