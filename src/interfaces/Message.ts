export interface MessageInterface {
  id?: number;
  content?: string;
  sender_id?: number;
  user_receiver_id?: number;
  group_receiver_id?: number;
  created_at?: Date;
}

export interface UserConversationInterface {
  user_receiver_id: number;
  firstname: string;
  path_picture: string;
  last_message: string;
  last_message_date: Date;
}

export interface GroupConversationInterface {
  group_receiver_id: number;
  title: string;
  path_picture: string;
  last_message: string;
  last_message_date: Date;
}

export interface UserChatInterface {
  user: {
    user_id: number;
    firstname: string;
    path_picture: string;
  };
  messages: {
    id: number;
    content: string;
    created_at: Date;
  }[];
}

export interface GroupChatInterface {
  group: {
    group_id: number;
    title: string;
    path_picture: string;
  };
  messages: {
    id: number;
    content: string;
    created_at: Date;
  }[];
}
