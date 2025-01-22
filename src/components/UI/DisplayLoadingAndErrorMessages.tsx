import { toast } from "react-toastify";

interface IDisplayLoadingAndErrorMessages {
  loading: boolean;
  error: boolean;
}

const DisplayLoadingAndErrorMessages = ({
  loading,
  error,
}: IDisplayLoadingAndErrorMessages) => {
  return (
    <>
      {loading && (
        <div className="text-blue text-center">Chargement des données...</div>
      )}
      {error && toast.error("Erreur lors du chargement des données")}
    </>
  );
};

export default DisplayLoadingAndErrorMessages;
