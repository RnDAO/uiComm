import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
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
      maxWidth='md'
      fullWidth
      className='overflow-hidden'
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
      <DialogTitle className='flex items-center justify-between bg-secondary text-center text-white'>
        <h4 className='text-base'>{headerText}</h4>
        <IoClose
          size={30}
          onClick={handleClose}
          className='cursor-pointer'
          data-testid='close-icon'
        />
      </DialogTitle>
      <DialogContent>
        <div className='pb-4 text-center'>{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export default TipsDialog;
