import { Tooltip as MuiToolTip, TooltipProps } from '@mui/material';

interface Props
   extends Pick<
      TooltipProps,
      'children' | 'title' | 'placement' | 'className'
   > {}
const Tooltip = ({ children, ...otherProps }: Props) => {
   return (
      <MuiToolTip disableInteractive describeChild {...otherProps}>
         {children}
      </MuiToolTip>
   );
};

export default Tooltip;
