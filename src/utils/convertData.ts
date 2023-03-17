import { Conversation } from '@/types/conversation';
import { ActiveTime } from '@/types/message';
import { User } from '@/types/user';
import { getFullName } from './getFullName';

export const getDataFromConversation = (
   conversation: Conversation,
   user?: User,
) => {
   const otherMember = conversation.members.find(
      (member) => member._id !== user?._id,
   );

   const avatar = conversation.avatar || otherMember?.avatar;
   const isOnline = otherMember?.isOnline;
   const fullName =
      conversation.name ||
      (otherMember &&
         getFullName(otherMember.firstName, otherMember.lastName)) ||
      '';

   return {
      avatar,
      isOnline,
      fullName,
   };
};

export const checkUserSeen = (seenBy: ActiveTime[], user?: User) => {
   return seenBy.find(
      ({ user: userSeen }) =>
         userSeen.toString() === user?._id ||
         userSeen._id?.toString() === user?._id,
   );
};
