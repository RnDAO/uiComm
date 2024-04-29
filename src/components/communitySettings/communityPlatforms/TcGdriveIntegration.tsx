import { CircularProgress, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';

import TcCommunityPlatformIcon from './TcCommunityPlatformIcon';
import TcButton from '../../shared/TcButton';
import useAppStore from '../../../store/useStore';
import { IPlatformProps } from '../../../utils/interfaces';
import TcAvatar from '../../shared/TcAvatar';
import TcText from '../../shared/TcText';
import TcDialog from '../../shared/TcDialog';
import { AiOutlineClose } from 'react-icons/ai';
import { useSnackbar } from '../../../context/SnackbarContext';
import { MdDelete } from 'react-icons/md';

interface TcGdriveIntegrationProps {
  platformType: string;
  isLoading: boolean;
  connectedPlatforms: IPlatformProps[];
  handleUpdateCommunityPlatoform: () => void;
}

function TcGdriveIntegration({ platformType, isLoading, connectedPlatforms, handleUpdateCommunityPlatoform }: TcGdriveIntegrationProps) {
  const { connectNewPlatform, deletePlatform, getUser } = useAppStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const { showMessage } = useSnackbar();

  useEffect(() => {
    const fetchUser = async () => {
      const { id } = await getUser();
      setUserId(id);
    };
    fetchUser()
  }, [])

  const handleDisconnectDiscordIntegration = async (
    deleteType: 'hard' | 'soft'
  ) => {
    try {
      const data = await deletePlatform({ id: connectedPlatforms[0].id, deleteType });
      if (data === '') {
        setIsDeleteDialogOpen(false);
        showMessage('Platform disconnected successfully.', 'success');
        handleUpdateCommunityPlatoform();
      }
    } catch (error) { }
  };


  return (
    <div className='flex items-center space-x-3 rounded-sm bg-secondary bg-opacity-5 p-5'>
      <Paper className='flex h-[6rem] w-[10rem] flex-col items-center justify-center rounded-sm py-2 shadow-none'>
        <span className='mx-auto'>
          <TcCommunityPlatformIcon platform='GDrive' />
        </span>
        <div className='mx-auto w-10/12 text-center'>
          <TcButton
            text='Connect'
            variant='text'
            color='primary'
            startIcon={<BiPlus />}
            onClick={() => connectNewPlatform('google', userId, ['googleDrive'])}
          />
        </div>
      </Paper>
      {isLoading ? (
        <CircularProgress size={30} />
      ) : (
        connectedPlatforms.map((platform, index) => (
          <Paper
            className='flex h-[6rem] w-[10rem] flex-col items-center justify-center space-y-1.5 overflow-hidden rounded-sm py-2 shadow-none'
            key={index}
          >
            <TcAvatar
              sizes='small'
            >
              G
            </TcAvatar>
            <TcButton startIcon={<MdDelete />} text='Disconnect' variant='text' onClick={() => setIsDeleteDialogOpen(true)} />
          </Paper>
        ))
      )}
      <TcDialog
        open={isDeleteDialogOpen}
        fullScreen={false}
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
          <AiOutlineClose
            className='cursor-pointer'
            size={24}
            onClick={() => setIsDeleteDialogOpen(false)}
          />
        </div>
        <div className='px-4 text-center md:px-8'>
          <div className='mx-auto text-center md:w-4/5'>
            <TcText
              text={`Are you sure you want to disconnect Google drive?`}
              variant='h6'
            />
          </div>
          <div className='flex flex-col justify-between space-y-4 pb-8 md:flex-row md:space-y-0 md:space-x-5 md:py-12'>
            <div className='space-y-4 rounded-md px-4 py-6 shadow-xl'>
              <TcText
                text='Disconnect and delete data'
                variant='body1'
                fontWeight='bold'
              />
              <TcText
                className='text-left'
                text={
                  <span>
                    Importing activities and members will be stopped. Historical
                    activities <b>will be deleted.</b>
                  </span>
                }
                variant='body2'
              />
              <TcButton
                text='Disconnect and delete'
                variant='contained'
                className='w-full'
                onClick={() => handleDisconnectDiscordIntegration('hard')}
              />
            </div>
            <div className='space-y-4 rounded-md px-4 py-6 shadow-xl'>
              <TcText
                text='Disconnect only'
                variant='body1'
                fontWeight='bold'
              />
              <TcText
                className='text-left'
                text={
                  <span>
                    Importing activities and members will be stopped. Historical
                    activities <b>will not be affected.</b>
                  </span>
                }
                variant='body2'
              />
              <TcButton
                text='Disconnect'
                variant='contained'
                className='w-full'
                onClick={() => handleDisconnectDiscordIntegration('soft')}
              />
            </div>
          </div>
        </div>
      </TcDialog>
    </div>
  );
}

export default TcGdriveIntegration;
