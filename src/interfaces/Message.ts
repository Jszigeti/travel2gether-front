export interface MessageInterface {
  id?: number;
  content?: string;
  sender_id?: number;
  user_receiver_id?: number;
  group_receiver_id?: number;
  created_at?: Date;
}
