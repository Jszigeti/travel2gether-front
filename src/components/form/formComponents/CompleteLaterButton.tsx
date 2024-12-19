import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CompleteLaterButton = () => {
  const navigate = useNavigate();

  return (
    <Typography
      className="text-center text-blue font-normal mt-6 cursor-pointer"
      onClick={() => {
        navigate(`/signin`);
        toast.success(
          "Compte créé avec succès, merci de valider votre compte !"
        );
      }}
    >
      Compléter plus tard
    </Typography>
  );
};

export default CompleteLaterButton;
