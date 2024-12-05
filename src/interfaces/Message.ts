export interface MessageInterface {
  id?: number;
  content?: string;
  sender_id?: number;
  user_receiver_id?: number;
  group_receiver_id?: number;
  created_at?: Date;
}

export interface ConversationInterface {
  user_receiver_id?: number;
  firstname?: string;
  group_receiver_id?: number;
  title?: string;
  path_picture: string;
  last_message: string;
  last_message_date: string;
}

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
  }[];
}
