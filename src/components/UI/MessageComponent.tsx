// ROUTER
import { NavLink } from "react-router-dom";

// INTERFACES
import { ProfileInterface } from "../../interfaces/Profile";
import { MessageInterface } from "../../interfaces/Message";

// COMPONENTS
import { Avatar } from "@material-tailwind/react";

// PROPS INTERFACE
interface MessageComponentProps {
  profile: ProfileInterface;
  message: MessageInterface;
}

export default function MessageComponent({
  profile,
  message,
}: MessageComponentProps) {
  return (
    <NavLink to={`/profile/${profile.user_id}`}>
      <div className="flex flex-col items-center gap-2 lg:gap-4">
        <Avatar
          src={profile.path_picture}
          alt="avatar"
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40"
        />
        <p className="font-bold">{profile.firstname}</p>
        <p>{message.content}</p>
      </div>
    </NavLink>
  );
}
