import { Button } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

export default function MyProfileEditComponent() {
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
        <NavLink to={"/a"}>
          <Button className="bg-red-500 ">Supprimer mon compte</Button>
        </NavLink>
      </section>
    </>
  );
}
