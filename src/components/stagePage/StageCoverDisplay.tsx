import { StageInterface } from "../../interfaces/Stage";

// PROPS INTERFACE
interface StageCoverDisplayProps {
  stageDetails: StageInterface;
}

export default function StageCoverDisplay({
  stageDetails,
}: StageCoverDisplayProps) {
  return (
    <div className="stage-cover">
      <img
        src={stageDetails.path_picture}
        alt="Image de couverture du stage"
        className="w-full xl:max-w-screen-xl xl:mx-auto max-h-[40rem] object-cover"
      />
    </div>
  );
}
