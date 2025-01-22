export interface ConversationInterface {
  userReceiverId?: number;
  firstname?: string;
  groupReceiverId?: number;
  title?: string;
  pathPicture: string;
  lastMessage: string;
  lastMessageDate: string;
}

export const conversationsList: ConversationInterface[] = [
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

export interface ChatInterface {
  user?: {
    userId: number;
    firstname: string;
    pathPicture: string;
  };
  group?: {
    groupId: number;
    title: string;
    pathPicture: string;
  };
  messages: {
    id: number;
    content: string;
    createdAt: string;
    sender: boolean;
  }[];
}

export const chatList: ChatInterface = {
  user: {
    userId: 1,
    firstname: "Marie",
    pathPicture: "Lien vers la photo de profil",
  },
  messages: [
    {
      id: 1,
      content: "Contenu de mon message",
      createdAt: "2024-10-29",
      sender: true,
    },
    {
      id: 2,
      content: "Contenu de mon message",
      createdAt: "2024-10-29",
      sender: false,
    },
    {
      id: 3,
      content: "Contenu de mon message",
      createdAt: "2024-10-29",
      sender: true,
    },
    {
      id: 4,
      content: "Contenu de mon message",
      createdAt: "2024-10-29",
      sender: false,
    },
    {
      id: 5,
      content: "Contenu de mon message",
      createdAt: "2024-10-29",
      sender: true,
    },
  ],
};
