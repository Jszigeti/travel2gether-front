export interface NotificationInterface {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  referenceId: number;
  referenceType: NotificationEnum[];
  details: string;
  isRead: boolean;
}

export enum NotificationEnum {
  PRIVATE_MESSAGE = "Message privé",
  GROUP_MESSAGE = "Message de groupe",
  GROUP_MODIFICATION = "Modification de groupe",
  GROUP_DELETE = "Groupe supprimé",
  GROUP_INVITATION = "Invitation dans un groupe",
  GROUP_STATUS_UPDATE = "Mise à jour du statut dans le groupe",
  GROUP_ROLE_UPDATE = "Mise à jour du rôle dans le groupe",
  GROUP_REQUEST = "Demande à rejoindre le groupe",
  GROUP_NEW_MEMBER = "Nouveau membre dans le groupe",
}
