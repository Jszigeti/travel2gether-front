// ROUTER
import { NavLink } from "react-router-dom";

// INTERFACES
import { GroupPageInterface } from "../../interfaces/Group";

// UTILS FUNCTIONS
import { formatDate } from "../../utils/formatDate";

// COMPONENTS
import { Button } from "@material-tailwind/react";

// PROPS INTERFACE
interface GroupStagesDisplayProps {
  groupDetails: GroupPageInterface;
  userRole: string;
  userStatus: string;
  groupId: string;
}

export default function GroupStagesDisplay({
  groupDetails,
  userRole,
  userStatus,
  groupId,
}: GroupStagesDisplayProps) {
  return (
    groupDetails.stages && (
      <section
        className={`flex flex-col gap-3 shadow-md p-4 rounded-md h-[10rem] ${
          (userRole === "ORGANIZER" || userRole === "AUTHOR") &&
          userStatus === "ACCEPTED" &&
          "h-[14rem] justify-between"
        }`}
      >
        <h2>Les étapes</h2>
        <div className="flex flex-col items-start overflow-y-auto">
          {groupDetails.stages.map((stage) => (
            <p key={stage.id}>
              <NavLink
                to={`/group/${groupId}/stage/${stage.id}`}
                className="block"
              >
                <span className="font-bold">
                  {stage.title} - {stage.address}
                </span>{" "}
                - du {formatDate(stage.dateFrom)} au {formatDate(stage.dateTo)}
              </NavLink>
            </p>
          ))}
        </div>
        {(userRole === "AUTHOR" || userRole === "ORGANIZER") &&
          userStatus === "ACCEPTED" && (
            <NavLink to={`/group/${groupId}/stage/create`} className="mx-auto">
              <Button className=" bg-blue w-56">Ajouter une étape</Button>
            </NavLink>
          )}
      </section>
    )
  );
}
