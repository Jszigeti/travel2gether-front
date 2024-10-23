// REACT HOOKS
import { Dispatch, SetStateAction } from "react";

// INTERFACES
import { GroupPageInterface } from "../interfaces/Group";
import {
  GroupUserRoleEnum,
  GroupUserStatusEnum,
} from "../interfaces/GroupUser";

export const retrieveUserRole = (
  groupDetailsData: GroupPageInterface,
  userId: number,
  setUserRole: Dispatch<
    SetStateAction<"NOT_MEMBER" | "TRAVELER" | "ORGANIZER" | "AUTHOR">
  >
) => {
  if (groupDetailsData) {
    const userProfile = groupDetailsData.profiles.find(
      (profile) => profile.user_id === userId
    );
    if (userProfile) {
      if (userProfile.role.includes(GroupUserRoleEnum.TRAVELER)) {
        setUserRole("TRAVELER");
      } else if (userProfile.role.includes(GroupUserRoleEnum.AUTHOR)) {
        setUserRole("AUTHOR");
      } else if (userProfile.role.includes(GroupUserRoleEnum.ORGANIZER)) {
        setUserRole("ORGANIZER");
      }
    }
  }
};

export const retrieveUserStatus = (
  groupDetailsData: GroupPageInterface,
  userId: number,
  setUserStatus: Dispatch<
    SetStateAction<"NOT_MEMBER" | "PENDING" | "ACCEPTED" | "DENIED">
  >
) => {
  if (groupDetailsData) {
    const userProfile = groupDetailsData.profiles.find(
      (profile) => profile.user_id === userId
    );
    if (userProfile) {
      if (userProfile.status.includes(GroupUserStatusEnum.PENDING)) {
        setUserStatus("PENDING");
      } else if (userProfile.status.includes(GroupUserStatusEnum.ACCEPTED)) {
        setUserStatus("ACCEPTED");
      } else if (userProfile.status.includes(GroupUserStatusEnum.DENIED)) {
        setUserStatus("DENIED");
      }
    }
  }
};
