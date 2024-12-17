// ROUTER
import { NavLink } from "react-router-dom";

// INTERFACES
import { GroupCardInterface } from "../../interfaces/Group";
import { GroupUserRoleEnum } from "../../interfaces/GroupUser";

// UTILS FUNCTIONS
import { formatDate } from "../../utils/formatDate";

// COMPONENTS
import { Avatar } from "@material-tailwind/react";

// PROPS INTERFACE
interface GroupCardProps {
  group: GroupCardInterface;
}

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <NavLink to={`/group/${group.id}`}>
      <article className="relative w-full pb-[60%] md:pb-[55%] rounded-lg overflow-hidden">
        <img
          src={group.pathPicture}
          alt={`Image du groupe`}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-75 rounded-lg z-10"></div>
        <p className="absolute left-4 top-4 text-white font-bold z-20 text-2xl">
          {group.title}
        </p>
        <p className="absolute right-4 bottom-4 text-white z-20 text-xl lg:text-lg xl:text-xl flex flex-col items-end sm:flex-row">
          {group.location && <span>{group.location},</span>}
          {group.dateFrom && group.dateTo && (
            <span>
              &nbsp;du {formatDate(group.dateFrom)} au{" "}
              {formatDate(group.dateTo)}
            </span>
          )}
        </p>
        <div className="absolute left-4 bottom-4 z-20 flex gap-2">
          {group.profiles &&
            group.profiles
              .slice(0, 3)
              .map((profile) => (
                <Avatar
                  key={profile.userId}
                  src={
                    profile.pathPicture
                      ? `${import.meta.env.VITE_API_BASE_URL}${
                          profile.pathPicture
                        }`
                      : "/src/assets/avatar/avatar.svg"
                  }
                  alt="Avatar"
                  className={`${
                    profile.role.includes(GroupUserRoleEnum.ORGANIZER) ||
                    profile.role.includes(GroupUserRoleEnum.AUTHOR)
                      ? "border-green"
                      : "border-blue"
                  } border-4 h-12 w-12 md:h-16 md:w-16 lg:h-12 lg:w-12 xl:h-16 xl:w-16`}
                />
              ))}
        </div>
      </article>
    </NavLink>
  );
}
