import React from 'react';
import {
  Button,
  Dialog,
  IconButton,
  Typography,
} from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';

interface TcDisconnectPlatformProps {
  open: boolean;
  handleClose: () => void;
  handleDisconnect: (type: 'hard' | 'soft') => void;
}

function TcDisconnectPlatform({
  open,
  handleClose,
  handleDisconnect,
}: TcDisconnectPlatformProps) {
  const handleDisconnectPlatform = (type: 'hard' | 'soft') => {
    handleDisconnect(type);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '640px',
            borderRadius: '10px',
          },
        },
      }}
    >
      <div className='flex justify-end p-4'>
        <IconButton aria-label='close-disconnect-dialog' onClick={handleClose}>
          <AiOutlineClose className='cursor-pointer' size={24} />
        </IconButton>
      </div>
      <div className='px-4 text-center md:px-8'>
        <div className='mx-auto text-center md:w-4/5'>
          <Typography variant='h6'>
            Are you sure you want to disconnect?
          </Typography>
        </div>
        <div className='flex flex-col justify-between space-y-4 pb-8 md:flex-row md:space-x-5 md:space-y-0 md:py-12'>
          <div className='space-y-4 rounded-md px-4 py-6 shadow-xl'>
            <Typography variant='body1' fontWeight='bold'>
              Disconnect and delete data
            </Typography>
            <Typography variant='body2' textAlign='left'>
              Importing new data will be stopped. Already imported and analyzed
              data <b>will be deleted.</b>
            </Typography>
            <Button
              variant='contained'
              fullWidth
              disableElevation
              onClick={() => handleDisconnectPlatform('hard')}
            >
              Disconnect and delete
            </Button>
          </div>
          <div className='space-y-4 rounded-md px-4 py-6 shadow-xl'>
            <Typography variant='body1' fontWeight='bold'>
              Disconnect only
            </Typography>
            <Typography textAlign='left' variant='body2'>
              <span>
                Importing new data will be stopped. Already imported and
                analyzed data <b>will be kept.</b>
              </span>
            </Typography>
            <Button
              variant='contained'
              fullWidth
              disableElevation
              onClick={() => handleDisconnectPlatform('soft')}
            >
              Disconnect
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default TcDisconnectPlatform;
