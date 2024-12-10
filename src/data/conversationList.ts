export interface ConversationInterface {
  user_receiver_id?: number;
  firstname?: string;
  group_receiver_id?: number;
  title?: string;
  path_picture: string;
  last_message: string;
  last_message_date: string;
}

export const conversationList: ConversationInterface[] = [
  {
    user_receiver_id: 1,
    firstname: "Marie",
    path_picture: "lien vers la photo de profil",
    last_message: "Contenu du dernier message",
    last_message_date: "2024-10-28",
  },
  {
    user_receiver_id: 2,
    firstname: "Marie",
    path_picture: "lien vers la photo de profil",
    last_message: "Contenu du dernier message",
    last_message_date: "2024-10-28",
  },
  {
    group_receiver_id: 1,
    title: "Voyage à Bordeaux",
    path_picture: "lien vers la photo du groupe",
    last_message: "Contenu du dernier message",
    last_message_date: "2024-10-28",
  },
  {
    group_receiver_id: 2,
    title: "Voyage en Normandie",
    path_picture: "lien vers la photo du groupe",
    last_message: "Contenu du dernier message",
    last_message_date: "2024-10-28",
  },
];
