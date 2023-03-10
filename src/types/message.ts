import { User } from './user';

export enum MessageStatusEnum {
   Sent = 'sent',
   Seen = 'seen',
   Received = 'received',
   Sending = 'sending',
}

export enum MessageTypeEnum {
   Text = 'text',
   Image = 'image',
   Video = 'video',
   Audio = 'audio',
   File = 'file',
}

export type ActiveTime = {
   user: string;
   activeTime: string;
};

export type MessageWithoutId = Omit<Message, '_id'>;

export type Message = {
   _id: string;
   conversation: string;
   sender: User;
   type: MessageTypeEnum;
   content: string;
   createdAt: string;
   status: MessageStatusEnum;
   seenBy: ActiveTime[];
   idClient: string;
   sentAt: string;
};
