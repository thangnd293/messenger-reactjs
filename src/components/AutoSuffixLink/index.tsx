import React from 'react';
import { Link, useParams } from 'react-router-dom';

type Props = React.ComponentProps<typeof Link>;
const AutoSuffixLink = (props: Props) => {
   const { conversationId } = useParams();
   let { to, ...restProps } = props;

   const [origin, hasConversation] = props.to.toString().split('/t/');

   const isAddSuffix = !hasConversation && conversationId;

   to = isAddSuffix ? `${origin}/t/${conversationId}` : to;

   return <Link to={to} {...restProps} />;
};

export default AutoSuffixLink;
