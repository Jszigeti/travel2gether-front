export interface ConversationInterface {
  userReceiverId?: number;
  firstname?: string;
  groupReceiverId?: number;
  title?: string;
  pathPicture: string;
  lastMessage: string;
  lastMessageDate: string;
}

export const conversationList: ConversationInterface[] = [
  {
    userReceiverId: 1,
    firstname: "Marie",
    pathPicture: "lien vers la photo de profil",
    lastMessage: "Contenu du dernier message",
    lastMessageDate: "2024-10-28",
  },
  {
    userReceiverId: 2,
    firstname: "Marie",
    pathPicture: "lien vers la photo de profil",
    lastMessage: "Contenu du dernier message",
    lastMessageDate: "2024-10-28",
  },
  {
    groupReceiverId: 1,
    title: "Voyage à Bordeaux",
    pathPicture: "lien vers la photo du groupe",
    lastMessage: "Contenu du dernier message",
    lastMessageDate: "2024-10-28",
  },
  {
    groupReceiverId: 2,
    title: "Voyage en Normandie",
    pathPicture: "lien vers la photo du groupe",
    lastMessage: "Contenu du dernier message",
    lastMessageDate: "2024-10-28",
  },
];
