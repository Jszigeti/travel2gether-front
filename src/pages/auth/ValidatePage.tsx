import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuthApi } from "../../api/auth";
import { toast } from "react-toastify";

export default function ValidatePage() {
  // AXIOS FUNCTIONS
  const { accountVerification } = useAuthApi();

  // USEPARAMS HOOK
  const { userId, verificationToken } = useParams();

  // REDIRECT
  const navigate = useNavigate();

  const validateAccount = async () => {
    if (userId && verificationToken) {
      try {
        await accountVerification(userId, verificationToken);
        toast.success("Félicitations, votre compte est validé !");
      } catch {
        toast.error(
          "Une erreur est survenue, un nouveau mail vient de vous être envoyé."
        );
      } finally {
        navigate("/signin");
      }
    } else {
      toast.error("Une erreur est survenue, veuillez réessayer.");
      navigate("/signin");
    }
  };

  useEffect(() => {
    validateAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
