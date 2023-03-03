export type Connection = {
   _id: string;
   user: Pick<
      User,
      '_id' | 'firstName' | 'lastName' | 'avatar' | 'isOnline' | 'lastActive'
   >;
};
