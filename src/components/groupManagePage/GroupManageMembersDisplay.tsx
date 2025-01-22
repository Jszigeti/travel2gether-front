// REACT QUERY
import { useQueryClient } from "@tanstack/react-query";

// AXIOS FUNCTIONS
import { useGroupApi } from "../../api/group";

// INTERFACES
import { GroupPageInterface } from "../../interfaces/Group";
import {
  GroupUserRoleEnum,
  GroupUserStatusEnum,
} from "../../interfaces/GroupUser";

// COMPONENTS
import { Avatar, Option, Select } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

// PROPS INTERFACE
interface GroupManageMembersDisplayProps {
  userId: number;
  groupId: number;
  groupDetails: GroupPageInterface;
}

export default function GroupManageMembersDisplay({
  userId,
  groupId,
  groupDetails,
}: GroupManageMembersDisplayProps) {
  const { editUserRoleFromGroup, kickUserFromGroup } = useGroupApi();
  // QUERY CLIENT DECLARATION
  const queryClient = useQueryClient();

  // RETRIEVE ACCEPTED USERS
  const acceptedUsers = groupDetails.profiles.filter((profile) =>
    profile.status.includes(GroupUserStatusEnum.ACCEPTED)
  );

  // ROLE CHANGE FUNCTION
  const handleRoleChange = async (
    userId: number,
    newRole: GroupUserRoleEnum
  ) => {
    try {
      await editUserRoleFromGroup(groupId, userId, newRole);
      queryClient.invalidateQueries({ queryKey: ["groupDetails", groupId] });
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  // DELETE USER FUNCTION
  const handleDeleteUser = async (userId: number) => {
    try {
      await kickUserFromGroup(groupId, userId);
      queryClient.invalidateQueries({ queryKey: ["groupDetails", groupId] });
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <section className="flex flex-col gap-3 w-full shadow-md p-4 rounded-md h-fit lg:col-span-2">
      <h2 className="text-center">Les membres</h2>
      <div className="flex flex-col gap-3">
        {acceptedUsers.map((profile) => (
          <div
            className="grid gap-3 grid-cols-3 sm:grid-cols-6"
            key={profile.userId}
          >
            <div className="flex items-center gap-3 col-span-2 order-1">
              <Avatar
                src={
                  profile.pathPicture
                    ? `${import.meta.env.VITE_API_BASE_URL}${
                        profile.pathPicture
                      }`
                    : "/assets/avatar/avatar.svg"
                }
                alt="Avatar du membre"
                size="sm"
              />
              <p className="overflow-hidden text-ellipsis text-nowrap">
                {profile.firstname}
              </p>
            </div>
            <div className="order-3 col-span-3 sm:order-2 sm:col-span-3">
              <Select
                onChange={(value) =>
                  handleRoleChange(profile.userId, value as GroupUserRoleEnum)
                }
                value={profile.role}
                disabled={
                  profile.role[0] === GroupUserRoleEnum.AUTHOR ||
                  profile.userId === userId
                }
                className="border border-blue"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              >
                <Option value={GroupUserRoleEnum.TRAVELER}>Voyageur</Option>
                <Option value={GroupUserRoleEnum.ORGANIZER}>
                  Organisateur
                </Option>
                <Option disabled value={GroupUserRoleEnum.AUTHOR}>
                  Auteur
                </Option>
              </Select>
            </div>
            <div className="flex justify-end items-center order-2 sm:order-3">
              <FontAwesomeIcon
                onClick={() => handleDeleteUser(profile.userId)}
                className={`cursor-pointer ${
                  profile.role[0] === GroupUserRoleEnum.AUTHOR ||
                  profile.userId === userId
                    ? "hidden"
                    : null
                }`}
                icon={faX}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
