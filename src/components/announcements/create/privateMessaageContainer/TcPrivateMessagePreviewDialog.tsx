import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { capitalizeFirstChar } from '../../../../helpers/helper';
import TcButton from '../../../shared/TcButton';
import TcDialog from '../../../shared/TcDialog';
import TcText from '../../../shared/TcText';

interface ITcPublicMessagePreviewDialogProps {
  textMessage: string;
  selectedRoles?: string[];
  selectedUsernames?: string[];
  selectedEngagementCategory?: string[];
  safetyChannel: string;
  isPreviewDialogEnabled: boolean;
}

function TcPublicMessagePreviewDialog({
  textMessage,
  selectedRoles,
  selectedUsernames,
  selectedEngagementCategory,
  safetyChannel,
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
          padding: {
            xs: 'auto',
            sm: '0.4rem 1.5rem',
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
                text='Preview Private Message'
                variant='h5'
                className='pb-4'
              />
              <div className='flex flex-wrap items-center space-x-1'>
                <TcText
                  text='Engagements Category(ies):'
                  variant='caption'
                  fontWeight={700}
                  className='text-gray-500'
                />
                {selectedEngagementCategory &&
                  selectedEngagementCategory.map((category, index, array) => (
                    <span key={category} className='flex items-center'>
                      #
                      <TcText
                        text={capitalizeFirstChar(
                          category.replaceAll('_', ' ')
                        )}
                        variant='caption'
                        fontWeight='700'
                      />
                      {index < array.length - 1 && ', '}
                    </span>
                  ))}
              </div>
              <div className='flex flex-col items-start'>
                <div className='flex flex-wrap items-center space-x-1'>
                  <TcText
                    text='Role(s):'
                    variant='caption'
                    fontWeight={700}
                    className='text-gray-500'
                  />
                  {selectedRoles &&
                    selectedRoles.map((role, index, array) => (
                      <span key={role} className='flex items-baseline'>
                        @
                        <TcText
                          text={role}
                          variant='caption'
                          fontWeight='700'
                        />
                        {index < array.length - 1 && ', '}
                      </span>
                    ))}
                </div>
                <div className='flex flex-wrap items-center space-x-1'>
                  <TcText
                    text='Username(s):'
                    variant='caption'
                    fontWeight={700}
                    className='text-gray-500'
                  />
                  {selectedUsernames &&
                    selectedUsernames.map((username, index, array) => (
                      <span key={username} className='flex items-center'>
                        #
                        <TcText
                          text={username}
                          variant='caption'
                          fontWeight='700'
                        />
                        {index < array.length - 1 && ', '}
                      </span>
                    ))}
                </div>
                <div className='flex flex-wrap items-center space-x-1'>
                  <TcText
                    text='Channel Safety Message:'
                    variant='caption'
                    fontWeight={700}
                    className='text-gray-500'
                  />
                  {safetyChannel && (
                    <TcText
                      text={`#${safetyChannel}`}
                      variant='caption'
                      fontWeight='700'
                    />
                  )}
                </div>
              </div>
              <TcText
                text={textMessage}
                variant='body1'
                className='mt-2 text-left'
              />
              <div className='w-full py-6'>
                <TcButton
                  text='Confirm'
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
