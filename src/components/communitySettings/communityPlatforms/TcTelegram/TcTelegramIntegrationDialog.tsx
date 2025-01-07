import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FiCopy } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

import useAppStore from '@/store/useStore';

import { useSnackbar } from '@/context/SnackbarContext';
import { StorageService } from '@/services/StorageService';
import { IntegrationPlatform } from '@/utils/enums';

import TcCommunityPlatformIcon from '../TcCommunityPlatformIcon';

interface TcTelegramIntegrationDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  telegram: {
    value: string | null;
    expiresAt: string | null;
  };
  generateToken: () => void;
  handleUpdateCommunityPlatform: () => void;
}

const TcTelegramIntegrationDialog: React.FC<
  TcTelegramIntegrationDialogProps
> = ({
  isOpen,
  handleClose,
  telegram,
  generateToken,
  handleUpdateCommunityPlatform,
}) => {
  const { retrieveCommunityById } = useAppStore();

  const { showMessage } = useSnackbar();
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [hasActiveTelegram, setHasActiveTelegram] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isOpen) {
      const fetchCommunityData = async () => {
        const storedCommunity: any =
          StorageService.readLocalStorage('community');
        if (storedCommunity?.id) {
          try {
            const community = await retrieveCommunityById(storedCommunity.id);
            const hasTelegramPlatform = community.platforms.some(
              (platform: { name: string }) => platform.name === 'telegram'
            );

            setHasActiveTelegram(hasTelegramPlatform);
          } catch (error) {
            console.error('Error fetching community data:', error);
          }
        }
      };

      fetchCommunityData();
      interval = setInterval(fetchCommunityData, 5000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, retrieveCommunityById]);

  useEffect(() => {
    if (hasActiveTelegram) {
      showMessage('Telegram platform connected successfully!', 'success');
      handleUpdateCommunityPlatform();
      handleClose();
    }
  }, [hasActiveTelegram]);

  useEffect(() => {
    if (!isOpen || !telegram.expiresAt) {
      setTimeLeft(0);
      setIsExpired(true);
      return;
    }

    const expiresAtTime = new Date(telegram.expiresAt).getTime();
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = Math.max(
        0,
        Math.floor((expiresAtTime - currentTime) / 1000)
      );
      setTimeLeft(remainingTime);

      if (remainingTime <= 0) {
        setIsExpired(true);
        clearInterval(interval);
      } else {
        setIsExpired(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, telegram.expiresAt]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const handleCopyToken = () => {
    if (telegram.value) {
      navigator.clipboard.writeText(`/verify ${telegram.value}`);
      showMessage('Token copied to clipboard!', 'success');
    } else {
      showMessage('No token available to copy.', 'error');
    }
  };

  return (
    <Dialog
      open={isOpen}
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
            Add a Telegram Group
          </Typography>
        </Stack>
        <IconButton onClick={handleClose} aria-label='Close dialog'>
          <IoClose size={30} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography variant='body1' className='font-bold'>
              Step 1: Add the bot
            </Typography>
            <Stack pl={2}>
              <ol className='list-decimal'>
                <li>
                  Add <b className='text-secondary'>@TogetherCrewBot</b> to your
                  group or channel.
                </li>
                <li>
                  Enable <b>Admin Rights</b> and disable other privileges.
                </li>
                <li>
                  Press <b>Add Bot as Admin</b> and confirm.
                </li>
              </ol>
            </Stack>
            <Alert
              severity='info'
              sx={{
                borderRadius: 1,
              }}
            >
              <b>Note:</b> To add the bot, you must have the "Add New Admins"
              privilege.
            </Alert>
          </Stack>
          <Stack spacing={1}>
            <Typography variant='body1' className='font-bold'>
              Step 2: Verify your group
            </Typography>
            <Typography>In your Telegram group, enter the command:</Typography>
            <TextField
              variant='outlined'
              value={`/verify ${telegram.value || ''}`}
              size='small'
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#EDEDED',
                  maxWidth: 300,
                },
              }}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='copy verification token'
                      size='small'
                      onClick={handleCopyToken}
                      disabled={!telegram.value}
                    >
                      <FiCopy />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {isExpired ? (
              <Alert
                severity='error'
                sx={{
                  borderRadius: 1,
                }}
              >
                <b>Error:</b> Your token has expired. Please generate a new
                token.
              </Alert>
            ) : (
              <Alert
                severity='warning'
                sx={{
                  borderRadius: 1,
                }}
              >
                <b>Note:</b> Your token is valid for{' '}
                <b>{formatTime(timeLeft)}</b>.
              </Alert>
            )}
          </Stack>
          <Stack spacing={1}>
            {isExpired ? (
              <Button
                variant='outlined'
                color='primary'
                fullWidth
                disableElevation
                onClick={generateToken}
              >
                Generate New Token
              </Button>
            ) : (
              <Button
                variant='contained'
                color='primary'
                fullWidth
                disableElevation
                sx={{
                  mb: 1,
                }}
                disabled
                startIcon={<CircularProgress size={16} color='inherit' />}
              >
                Pending Verification...
              </Button>
            )}
            <Typography variant='body1' color='textSecondary'>
              Need help? View our{' '}
              <a href='/documentation' className='text-secondary underline'>
                documentation
              </a>{' '}
              or contact our{' '}
              <a href='/support' className='text-secondary underline'>
                support team
              </a>
              .
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default TcTelegramIntegrationDialog;
