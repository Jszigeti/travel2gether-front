// ROUTER
import { NavLink } from "react-router-dom";

// INTERFACES
import { ProfileInterface } from "../../interfaces/Profile";

// COMPONENTS
import { Avatar } from "@material-tailwind/react";

// PROPS INTERFACE
interface AvatarCardProps {
  profile: ProfileInterface;
}

export default function AvatarCard({ profile }: AvatarCardProps) {
  return (
    <NavLink to={`/profile/${profile.userId}`}>
      <div className="flex flex-col items-center gap-2 lg:gap-4">
        <Avatar
          src={
            profile.pathPicture
              ? `${import.meta.env.VITE_API_BASE_URL}${profile.pathPicture}`
              : "/assets/avatar/avatar.svg"
          }
          alt="avatar"
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40"
        />
        <p className="font-bold">{profile.firstname}</p>
      </div>
    </NavLink>
  );
}
