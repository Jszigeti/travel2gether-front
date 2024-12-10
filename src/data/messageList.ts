export interface ChatInterface {
  user?: {
    userId: number;
    firstname: string;
    pathPicture: string;
  };
  group?: {
    group_id: number;
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
