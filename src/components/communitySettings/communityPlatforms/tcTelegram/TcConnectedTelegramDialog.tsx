import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { IoClose } from 'react-icons/io5';

import { IntegrationPlatform } from '@/utils/enums';
import { IPlatformProps } from '@/utils/interfaces';

import TcCommunityPlatformIcon from '../TcCommunityPlatformIcon';

interface TcConnectedTelegramDialogProps {
  platform: IPlatformProps;
  open: boolean;
  handleClose: () => void;
  handleDisconnect: () => void;
}

function TcConnectedTelegramDialog({
  platform,
  open,
  handleClose,
  handleDisconnect,
}: TcConnectedTelegramDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            borderRadius: '10px',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Stack direction='row' alignItems='center' gap={1}>
          <TcCommunityPlatformIcon platform={IntegrationPlatform.Telegram} />
          <Typography variant='h6' fontWeight='bold'>
            Manage Telegram Platform
          </Typography>
        </Stack>
        <IconButton onClick={handleClose} aria-label='Close dialog'>
          <IoClose size={30} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant='body1'>
            <b>Group Name:</b> {platform?.metadata?.chat?.title}
          </Typography>
          <Typography variant='body1'>
            <b>Group ID:</b> {platform?.metadata?.chat?.id}
          </Typography>
          <Typography variant='body1'>
            <b>Created At:</b>{' '}
            {moment(platform?.createdAt).format('D MMM YYYY')}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack
          p={1}
          sx={{
            width: '100%',
          }}
        >
          <Button variant='outlined' fullWidth onClick={handleDisconnect}>
            Disconnect
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

export default TcConnectedTelegramDialog;
