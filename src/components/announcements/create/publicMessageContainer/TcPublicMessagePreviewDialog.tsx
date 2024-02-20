import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import TcButton from '../../../shared/TcButton';
import TcDialog from '../../../shared/TcDialog';
import TcText from '../../../shared/TcText';

interface ITcPublicMessagePreviewDialogProps {
  textMessage: string;
  selectedChannels: string[];
  isPreviewDialogEnabled: boolean;
}

function TcPublicMessagePreviewDialog({
  textMessage,
  selectedChannels,
  isPreviewDialogEnabled,
}: ITcPublicMessagePreviewDialogProps) {
  const [isPreviewDialogOpen, setPreviewDialogOpen] = useState<boolean>(false);
  return (
    <>
      <TcButton
        text='Preview'
        variant='outlined'
        sx={{
          maxWidth: {
            xs: '100%',
            sm: '8rem',
          },
          height: '2.4rem',
        }}
        disabled={!isPreviewDialogEnabled}
        onClick={() => setPreviewDialogOpen(true)}
      />
      <TcDialog
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '470px',
              borderRadius: '10px',
            },
          },
        }}
        children={
          <>
            <div className='flex justify-end p-4'>
              <AiOutlineClose
                data-testid='close-icon'
                className='cursor-pointer'
                size={24}
                onClick={() => setPreviewDialogOpen(false)}
              />
            </div>
            <div className='mx-auto flex w-4/5 flex-col py-1 text-center'>
              <TcText
                text='Preview Public Message'
                variant='h5'
                className='pb-4'
              />
              <div className='flex flex-wrap items-center space-x-1'>
                <TcText
                  text='Channels:'
                  variant='caption'
                  fontWeight={700}
                  className='text-gray-500'
                />
                {selectedChannels &&
                  selectedChannels.map((channel, index, array) => (
                    <span key={channel} className='flex items-center'>
                      #
                      <TcText
                        text={channel}
                        variant='caption'
                        fontWeight='700'
                      />
                      {index < array.length - 1 && ', '}
                    </span>
                  ))}
              </div>
              <TcText
                text={textMessage}
                variant='body1'
                className='text-left'
              />
              <div className='w-full py-6'>
                <TcButton
                  text="Confirm"
                  variant='contained'
                  onClick={() => setPreviewDialogOpen(false)}
                  sx={{ width: '100%' }}
                />
              </div>
            </div>
          </>
        }
        open={isPreviewDialogOpen}
      />
    </>
  );
}

export default TcPublicMessagePreviewDialog;
