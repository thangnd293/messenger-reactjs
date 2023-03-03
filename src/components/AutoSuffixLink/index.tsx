import React, { forwardRef } from 'react';
import { Link, LinkProps, useParams } from 'react-router-dom';

type Props = React.ComponentProps<typeof Link>;
type Ref = React.ForwardRefExoticComponent<
   LinkProps & React.RefAttributes<HTMLAnchorElement>
>;
const AutoSuffixLink = forwardRef<any, Props>((props, ref) => {
   const { conversationId } = useParams();
   let { to, ...restProps } = props;

   const [origin, hasConversation] = props.to.toString().split('/t');

   const isAddSuffix = !hasConversation && conversationId;

   to = isAddSuffix ? `${origin}/t/${conversationId}` : to;

   return <Link ref={ref} to={to} {...restProps} />;
});

export default AutoSuffixLink;
