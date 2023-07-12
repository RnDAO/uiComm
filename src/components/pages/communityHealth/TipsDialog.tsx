import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface TipsDialogProps {
  isOpen: boolean;
  headerText: string;
  onClose: () => void;
  children: React.ReactNode;
}

function TipsDialog({
  isOpen,
  headerText,
  onClose,
  children,
}: TipsDialogProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      maxWidth="md"
      fullWidth
      className="overflow-hidden"
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'flex-start',
          verticalAlign: 'top',
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '650px',
            borderRadius: '10px',
          },
        },
      }}
    >
      <DialogTitle className="flex justify-between items-center text-center bg-secondary text-white">
        <h4 className="text-base">{headerText}</h4>
        <IoClose size={30} onClick={handleClose} className="cursor-pointer" />
      </DialogTitle>
      <DialogContent>
        <div className="text-center pb-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export default TipsDialog;
