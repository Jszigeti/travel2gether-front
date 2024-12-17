// REACT HOOKS
import { useState } from "react";

// ROUTER
import { NavLink } from "react-router-dom";

// INTERFACES
import { GroupPageInterface } from "../../interfaces/Group";
import { GroupUserRoleEnum } from "../../interfaces/GroupUser";

// COMPONENTS
import {
  Accordion,
  Avatar,
  AccordionBody,
  Button,
} from "@material-tailwind/react";

// PROPS INTERFACE
interface GroupMembersDisplayProps {
  groupDetails: GroupPageInterface;
  userRole: string;
  userStatus: string;
}

export default function GroupMembersDisplay({
  groupDetails,
  userRole,
  userStatus,
}: GroupMembersDisplayProps) {
  // STATES
  const [open, setOpen] = useState(false);

  return (
    groupDetails.profiles && (
      <section
        className={`flex flex-col gap-3 shadow-md p-4 rounded-md min-h-[10rem] h-fit ${
          (userRole === "ORGANIZER" || userRole === "AUTHOR") &&
          userStatus === "ACCEPTED" &&
          "min-h-[14rem] justify-between"
        }`}
      >
        <div className="flex justify-between">
          <h2>Les membres</h2>
          {groupDetails.profiles.length > 4 && (
            <div
              className="font-normal text-base text-right cursor-pointer"
              onClick={() => setOpen((open) => !open)}
            >
              {open ? "Voir moins" : "Voir plus"}
            </div>
          )}
        </div>
        <Accordion open={open}>
          <div className="flex justify-between">
            <div className="grid grid-cols-4 w-full gap-6">
              {groupDetails.profiles.slice(0, 4).map((profile) => (
                <NavLink to={`/profile/${profile.userId}`} key={profile.userId}>
                  <Avatar
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
                    } border-4 h-20 w-20`}
                  />
                </NavLink>
              ))}
            </div>
          </div>
          {groupDetails.profiles.length > 4 && (
            <AccordionBody className="grid grid-cols-4 w-full gap-6">
              {groupDetails.profiles.slice(4).map((profile) => (
                <NavLink to={`/profile/${profile.userId}`} key={profile.userId}>
                  <Avatar
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
                    } border-4 h-20 w-20`}
                  />
                </NavLink>
              ))}
            </AccordionBody>
          )}
        </Accordion>
        {(userRole === "AUTHOR" || userRole === "ORGANIZER") &&
          userStatus === "ACCEPTED" && (
            <Button className=" bg-blue w-56 mx-auto">
              Inviter des membres
            </Button>
          )}
      </section>
    )
  );
}
