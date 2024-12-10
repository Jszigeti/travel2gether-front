export interface MessageInterface {
  id?: number;
  content?: string;
  senderId?: number;
  userReceiverId?: number;
  groupReceiverId?: number;
  createdAt?: Date;
}

export interface UserConversationInterface {
  userReceiverId: number;
  firstname: string;
  pathPicture: string;
  lastMessage: string;
  lastMessageDate: Date;
}

export interface GroupConversationInterface {
  groupReceiverId: number;
  title: string;
  pathPicture: string;
  lastMessage: string;
  lastMessageDate: Date;
}

export interface ConversationInterface {
  userReceiverId?: number;
  firstname?: string;
  groupReceiverId?: number;
  title?: string;
  pathPicture: string;
  lastMessage: string;
  lastMessageDate: string;
}

export interface ChatInterface {
  user?: {
    user_id: number;
    firstname: string;
    pathPicture: string;
  };
  messages: {
    id: number;
    content: string;
    createdAt: Date;
  }[];
}

export interface GroupChatInterface {
  group: {
    group_id: number;
    title: string;
    pathPicture: string;
  };
  messages: {
    id: number;
    content: string;
    createdAt: Date;
  }[];
}
