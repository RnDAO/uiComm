import React from 'react';
import { Popover, List, ListItem, ListItemText } from '@mui/material';

interface CustomPopoverProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomPopover: React.FC<CustomPopoverProps> = ({
  open,
  anchorEl,
  onClose,
  children,
}) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <List>{children}</List>
    </Popover>
  );
};

export default CustomPopover;
