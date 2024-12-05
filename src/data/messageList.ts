export interface ChatInterface {
  user?: {
    user_id: number;
    firstname: string;
    path_picture: string;
  };
  group?: {
    group_id: number;
    title: string;
    path_picture: string;
  };
  messages: {
    id: number;
    content: string;
    created_at: string;
    sender: boolean;
  }[];
}

export const chatList: ChatInterface = {
  user: {
    user_id: 1,
    firstname: "Marie",
    path_picture: "Lien vers la photo de profil",
  },
  messages: [
    {
      id: 1,
      content: "Contenu de mon message",
      created_at: "2024-10-29",
      sender: true,
    },
    {
      id: 2,
      content: "Contenu de mon message",
      created_at: "2024-10-29",
      sender: false,
    },
    {
      id: 3,
      content: "Contenu de mon message",
      created_at: "2024-10-29",
      sender: true,
    },
    {
      id: 4,
      content: "Contenu de mon message",
      created_at: "2024-10-29",
      sender: false,
    },
    {
      id: 5,
      content: "Contenu de mon message",
      created_at: "2024-10-29",
      sender: true,
    },
  ],
};
