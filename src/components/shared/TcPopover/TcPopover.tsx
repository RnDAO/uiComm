/**
 * TcPopover Component
 *
 * A reusable popover component that displays content in a Material-UI Popover.
 * It can be controlled (opened and closed) programmatically.
 *
 * Props:
 * - open: Boolean indicating if the popover is open.
 * - anchorEl: The DOM element used as the popover's anchor.
 * - content: The content to be displayed inside the popover.
 * - onClose: Callback function to be called when the popover is requested to be closed.
 *
 * Example Usage:
 * <TcPopover
 *   open={isOpen}
 *   anchorEl={anchorElement}
 *   content={<div>Popover content</div>}
 *   onClose={() => setIsOpen(false)}
 * />
 */

import React from 'react';
import { Popover } from '@mui/material';

interface TcPopoverProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  content: React.ReactNode;
  onClose: () => void;
}

const TcPopover = ({
  open,
  anchorEl,
  content,
  onClose,
  ...props
}: TcPopoverProps) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      {...props}
    >
      {content}
    </Popover>
  );
};

export default TcPopover;
