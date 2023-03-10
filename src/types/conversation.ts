import { Message } from './message';
import { User } from './user';

export enum ConversationTypeEnum {
   private = 'private',
   group = 'group',
}

export type Conversation = {
   _id: string;
   type: ConversationTypeEnum;
   user: Pick<
      User,
      '_id' | 'firstName' | 'lastName' | 'avatar' | 'isOnline' | 'lastActive'
   >;
   lastMessage: Message;
   avatar?: string;
   name: string;
   isOnline?: boolean;
   members: User[];
};
