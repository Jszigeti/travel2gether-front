// REACT HOOKS
import { useState } from "react";

// REACT QUERY
import { useQueryClient } from "@tanstack/react-query";

// AXIOS FUNCTIONS
import { editUserFromGroup } from "../../api/group";

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
  // STATES
  const [error, setError] = useState<null | string>(null);

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
    const body = { role: [newRole] };
    try {
      const response = await editUserFromGroup(groupId, userId, body);
      console.log("Modification du rôle réussie", response);
      queryClient.invalidateQueries({ queryKey: ["groupDetails", groupId] });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur inconnue est survenue");
      }
      console.log(error);
    }
  };

  // DELETE USER FUNCTION
  const handleDeleteUser = async (userId: number) => {
    const body = { status: [GroupUserStatusEnum.DENIED] };
    try {
      setError(null);
      const response = await editUserFromGroup(groupId, userId, body);
      console.log("Voyageur exclu", response);
      queryClient.invalidateQueries({ queryKey: ["groupDetails", groupId] });
    } catch (errors: unknown) {
      if (errors instanceof Error) {
        setError(errors.message);
      } else {
        setError("Une erreur est survenue");
      }
      console.log(errors);
    }
  };

  return (
    <section className="flex flex-col gap-3 w-full shadow-md p-4 rounded-md h-fit lg:col-span-2">
      <h2 className="text-center">Les membres</h2>
      <div className="flex flex-col gap-3">
        {acceptedUsers.map((profile) => (
          <div
            className="grid gap-3 grid-cols-3 sm:grid-cols-6"
            key={profile.user_id}
          >
            <div className="flex items-center gap-3 col-span-2 order-1">
              <Avatar
                src={profile.path_picture}
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
                  handleRoleChange(profile.user_id, value as GroupUserRoleEnum)
                }
                value={profile.role[0]}
                disabled={
                  profile.role[0] === GroupUserRoleEnum.AUTHOR ||
                  profile.user_id === userId
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
                onClick={() => handleDeleteUser(profile.user_id)}
                className={`cursor-pointer ${
                  profile.role[0] === GroupUserRoleEnum.AUTHOR ||
                  profile.user_id === userId
                    ? "hidden"
                    : null
                }`}
                icon={faX}
              />
            </div>
          </div>
        ))}
      </div>
      {error && (
        <div className="text-red-500 text-center">
          Erreur lors de la mise à jour du/des rôles
        </div>
      )}
    </section>
  );
}
