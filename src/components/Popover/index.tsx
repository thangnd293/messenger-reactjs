import { Popover as MuiPopover, PopoverProps } from '@mui/material';

const Popover = ({
   children,
   ...otherProps
}: Omit<PopoverProps, 'PaperProps'>) => {
   return (
      <MuiPopover
         PaperProps={{
            variant: 'outlined',
            elevation: 0,
            sx: { bgcolor: 'background.default' },
         }}
         {...otherProps}
      >
         {children}
      </MuiPopover>
   );
};

export default Popover;
