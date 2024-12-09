import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthApi } from "../../api/auth";
import useAuthContext from "../../hooks/context/useAuthContext";

export default function MyProfileEditComponent() {
  // STATES
  const [error, setError] = useState<null | string>(null);

  // Import delete user function
  const { deleteUser } = useAuthApi();

  // RETRIEVE USER AND LOGOUT FUNCTION FROM CONTEXT
  const { user, logout } = useAuthContext();

  // REDIRECTION
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    if (user) {
      try {
        setError(null);
        const response = await deleteUser(user.userId);
        console.log("Compte supprimé", response);
        logout();
        navigate(`/`);
      } catch (errors: unknown) {
        if (errors instanceof Error) {
          setError(errors.message);
        } else {
          setError("Une erreur est survenue");
        }
        console.log(errors);
      }
    }
  };

  return (
    <>
      <section className="flex flex-col gap-6 lg:gap-12 justify-center">
        <NavLink to={"/my-profile/edit/account"}>
          <Button className="bg-blue w-72 ">Mon compte</Button>
        </NavLink>
        <NavLink to={"/my-profile/edit/info"}>
          <Button className="bg-blue w-72 ">Mes infos</Button>
        </NavLink>
        <NavLink to={"/my-profile/edit/pref"}>
          <Button className="bg-blue w-72 ">Mes préférences</Button>
        </NavLink>
      </section>
      <section className="flex justify-center ">
        <Button onClick={handleDeleteUser} className="bg-red-500 ">
          Supprimer mon compte
        </Button>
        {error && (
          <div className="text-red-500 text-center ">
            Erreur lors de la suppression du compte
          </div>
        )}
      </section>
    </>
  );
}
