import React, { useState } from 'react';
import TcButton from '../shared/TcButton';
import { AiOutlineClose } from 'react-icons/ai';
import TcDialog from '../shared/TcDialog';
import TcText from '../shared/TcText';
import { FaDiscord } from 'react-icons/fa6';

interface ITcConfirmSchaduledAnnouncementsDialogProps {
  buttonLabel: string;
  selectedChannels: string[];
  selectedRoles?: string[];
  selectedUsernames?: string[];
  schaduledDate: string;
}

function TcConfirmSchaduledAnnouncementsDialog({
  buttonLabel,
}: ITcConfirmSchaduledAnnouncementsDialogProps) {
  const [confirmSchadulerDialog, setConfirmSchadulerDialog] =
    useState<boolean>(false);

  return (
    <>
      <TcButton
        text={buttonLabel}
        variant="contained"
        onClick={() => setConfirmSchadulerDialog(true)}
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
            <div className="flex justify-end p-4">
              <AiOutlineClose
                data-testid="close-icon"
                className="cursor-pointer"
                size={24}
                onClick={() => setConfirmSchadulerDialog(false)}
              />
            </div>
            <div className="flex flex-col w-4/5 mx-auto text-center py-1">
              <TcText text="Confirm Schedule" variant="h6" className="pb-4" />
              <div className="space-y-2">
                <div className="flex items-center space-x-1">
                  <FaDiscord size={20} className="text-gray-500" />
                  <TcText
                    text={'Discord announcements scheduled for:'}
                    variant="body2"
                    className="text-left"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <TcText
                    text={'Public Message to:'}
                    fontWeight={500}
                    variant="subtitle2"
                    className="text-left"
                  />
                  <TcText text="July 12 at 13pm (CET)" variant="subtitle2" />
                </div>
                <div className="flex items-center justify-between">
                  <TcText
                    text={'Private Message to these user(s):'}
                    fontWeight={500}
                    variant="subtitle2"
                    className="text-left"
                  />
                  <TcText text="July 12 at 13pm (CET)" variant="subtitle2" />
                </div>
                <div className="flex items-center justify-between">
                  <TcText
                    text={'Private Message to these role(s):'}
                    fontWeight={500}
                    variant="subtitle2"
                    className="text-left"
                  />
                  <TcText text="July 12 at 13pm (CET)" variant="subtitle2" />
                </div>
              </div>
              <div className="py-6 w-full">
                <TcButton
                  text={'Confirm'}
                  variant="contained"
                  onClick={() => setConfirmSchadulerDialog(false)}
                  sx={{ width: '100%' }}
                />
              </div>
            </div>
          </>
        }
        open={confirmSchadulerDialog}
      />
    </>
  );
}

export default TcConfirmSchaduledAnnouncementsDialog;
