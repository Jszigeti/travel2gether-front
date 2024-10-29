import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/formatDate";
import { StageInterface } from "../../interfaces/Stage";

// PROPS INTERFACE
interface StageInfoDisplayProps {
  stageDetails: StageInterface;
}

export default function StageInfoDisplay({
  stageDetails,
}: StageInfoDisplayProps) {
  return (
    <section className="flex flex-col gap-3 shadow-md p-4 rounded-md">
      <div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLocationDot} />
          <p className="font-bold">{stageDetails.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCalendar} />
          <p className="font-bold">
            du {formatDate(stageDetails.date_from)} au{" "}
            {formatDate(stageDetails.date_to)}
          </p>
        </div>
      </div>
      <p>{stageDetails.description}</p>
    </section>
  );
}
