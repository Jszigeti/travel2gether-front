// ROUTER
import { NavLink } from "react-router-dom";
import { UserConversationInterface } from "../../interfaces/Message";
// INTERFACES
import { ProfileInterface } from "../../interfaces/Profile";
//import { MessageInterface } from "../../interfaces/Message";

// COMPONENTS
import { Avatar } from "@material-tailwind/react";

// PROPS INTERFACE
interface ChatComponentProps {
  chat: UserConversationInterface;
  profile: ProfileInterface;
}

export default function ChatComponent({ chat, profile }: ChatComponentProps) {
  return (
    <NavLink to={`/profile/${chat.userReceiverId}`}>
      <div className="flex flex-col items-center gap-2 lg:gap-4">
        <Avatar
          src={profile.pathPicture}
          alt="avatar"
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40"
        />
        <p className="font-bold">{profile.firstname}</p>
        <p>{chat.lastMessage ? chat.lastMessage : "nothing"}</p>
      </div>
    </NavLink>
  );
}
