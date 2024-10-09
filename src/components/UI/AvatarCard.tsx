// ROUTER
import { NavLink } from "react-router-dom";

// COMPONENTS
import { Avatar } from "@material-tailwind/react";

export default function AvatarCard({ profile }: any) {
  return (
    <NavLink to={`/profile/${profile.user_id}`}>
      <div className="flex flex-col items-center gap-2 lg:gap-4">
        <Avatar
          src={profile.path_picture}
          alt="avatar"
          className="w-24 h-24 sm:w-40 sm:h-40"
        />
        <p className="font-bold">{profile.firstname}</p>
      </div>
    </NavLink>
  );
}
