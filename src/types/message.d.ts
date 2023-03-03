export enum MessageStatusEnum {
   sent = 'sent',
   seen = 'seen',
   received = 'received',
}

export enum MessageTypeEnum {
   text = 'text',
   image = 'image',
   video = 'video',
   audio = 'audio',
   file = 'file',
}

export type ActiveTime = {
   user: User;
   activeTime: string;
};

export type Message = {
   _id: string;
   conversationId: string;
   sender: User;
   type: MessageTypeEnum;
   content: string;
   createdAt: string;
   status: MessageStatusEnum;
   seenBy: ActiveTime[];
};
