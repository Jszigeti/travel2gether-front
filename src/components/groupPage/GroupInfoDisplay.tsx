// INTERFACES
import { GroupPageInterface } from "../../interfaces/Group";

// UTILS FUNCTIONS
import { formatDate } from "../../utils/formatDate";

// COMPONENTS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendar } from "@fortawesome/free-solid-svg-icons";

// PROPS INTERFACE
interface GroupInfoDisplayProps {
  groupDetails: GroupPageInterface;
}

export default function GroupInfoDisplay({
  groupDetails,
}: GroupInfoDisplayProps) {
  return (
    <section className="flex flex-col gap-3 shadow-md p-4 rounded-md">
      <div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLocationDot} />
          <p className="font-bold">{groupDetails.location}</p>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCalendar} />
          <p className="font-bold">
            du {formatDate(groupDetails.date_from)} au{" "}
            {formatDate(groupDetails.date_to)}
          </p>
        </div>
      </div>
      <p>{groupDetails.description}</p>
    </section>
  );
}
