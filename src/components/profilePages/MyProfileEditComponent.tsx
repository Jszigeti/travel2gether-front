import { Button } from "@material-tailwind/react";
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../hooks/context/user.context";
import { deleteUser } from "../../api/auth";

export default function MyProfileEditComponent() {
  // STATES
  const [error, setError] = useState<null | string>(null);

  // RETRIEVE USER ID
  const { userId, logout } = useContext(UserContext) || {};

  // REDIRECTION
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    if (userId && logout) {
      try {
        setError(null);
        const response = await deleteUser(userId);
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
