import Router from 'next/router';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { RiTimeLine } from 'react-icons/ri';

import TcButton from '../../shared/TcButton';
import TcDialog from '../../shared/TcDialog';
import TcText from '../../shared/TcText';

interface ITcCommunityIntegrationsConfirmDialog {
  isOpen: boolean;
  toggleDialog: () => void;
}

function TcCommunityIntegrationsConfirmDialog({
  isOpen,
  toggleDialog,
}: ITcCommunityIntegrationsConfirmDialog) {
  const handleCloseDialog = () => {
    toggleDialog();
    Router.replace('/community-settings');
  };
  return (
    <TcDialog
      open={isOpen}
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
          onClick={() => toggleDialog()}
        />
      </div>
      <div className='mx-auto flex w-4/5 flex-col space-y-5 p-5 text-center'>
        <div className='mx-auto w-16 rounded-full bg-[#F5F5F5] p-3'>
          <RiTimeLine className='mx-auto' size={38} />
        </div>
        <TcText text="Perfect, you're all set!" variant='h5' />
        <TcText
          text='Data import just started. It might take up to 12 hours to finish. Once it is done we will send you a message on Discord.'
          variant='body2'
        />
        <div className='py-6'>
          <TcButton
            text='I understand'
            variant='contained'
            onClick={() => handleCloseDialog()}
          />
        </div>
      </div>
    </TcDialog>
  );
}

export default TcCommunityIntegrationsConfirmDialog;
