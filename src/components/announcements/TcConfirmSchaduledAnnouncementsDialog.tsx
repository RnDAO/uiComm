import React, { useState } from 'react';
import TcButton from '../shared/TcButton';
import { AiOutlineClose } from 'react-icons/ai';
import TcDialog from '../shared/TcDialog';
import TcText from '../shared/TcText';
import { FaDiscord } from 'react-icons/fa6';
import moment from 'moment';
import { IRoles, IUser } from '../../utils/interfaces';

interface ITcConfirmSchaduledAnnouncementsDialogProps {
  buttonLabel: string;
  selectedChannels: { id: string; label: string }[];
  selectedRoles?: IRoles[];
  selectedUsernames?: IUser[];
  schaduledDate: string;
  isDisabled: boolean;
  handleCreateAnnouncements: (isDrafted: boolean) => void;
}

const formatDateToLocalTimezone = (scheduledDate: string) => {
  if (!scheduledDate) {
    console.error('Scheduled date is undefined or null');
    return 'Invalid Date';
  }

  const formattedDate = moment(scheduledDate).format('MMMM D [at] hA');

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return `${formattedDate} (${timezone})`;
};

function TcConfirmSchaduledAnnouncementsDialog({
  buttonLabel,
  schaduledDate,
  selectedRoles,
  selectedUsernames,
  selectedChannels,
  isDisabled = true,
  handleCreateAnnouncements,
}: ITcConfirmSchaduledAnnouncementsDialogProps) {
  const [confirmSchadulerDialog, setConfirmSchadulerDialog] =
    useState<boolean>(false);

  return (
    <>
      <TcButton
        text={buttonLabel}
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
        variant="contained"
        disabled={isDisabled}
        onClick={() => setConfirmSchadulerDialog(true)}
      />
      <TcDialog
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '670px',
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
            <div className="flex flex-col w-4/5 mx-auto py-1">
              <TcText
                text="Confirm Schedule"
                variant="h6"
                className="pb-4  text-center"
              />
              <div className="space-y-2">
                <div className="flex items-center space-x-1">
                  <FaDiscord size={20} className="text-gray-500" />
                  <TcText
                    text={'Discord announcements scheduled for:'}
                    variant="body2"
                    className="text-left"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <TcText
                      text={'Public Message to:'}
                      fontWeight={500}
                      variant="subtitle2"
                      className="text-left text-gray-400"
                    />
                    <TcText
                      text={
                        schaduledDate
                          ? formatDateToLocalTimezone(schaduledDate)
                          : ''
                      }
                      variant="subtitle2"
                    />
                  </div>
                  {selectedChannels
                    .map((channel) => `#${channel.label}`)
                    .join(', ')}
                </div>
                {selectedUsernames && selectedUsernames.length > 0 ? (
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <TcText
                        text={'Private Message to these user(s):'}
                        fontWeight={500}
                        variant="subtitle2"
                        className="text-left text-gray-400"
                      />
                      <TcText
                        text={
                          schaduledDate
                            ? formatDateToLocalTimezone(schaduledDate)
                            : ''
                        }
                        variant="subtitle2"
                      />{' '}
                    </div>
                    {selectedChannels
                      .map((channel) => `#${channel.label}`)
                      .join(', ')}
                  </div>
                ) : (
                  ''
                )}
                {selectedRoles && selectedRoles.length > 0 ? (
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <TcText
                        text={'Private Message to these role(s):'}
                        fontWeight={500}
                        variant="subtitle2"
                        className="text-left text-gray-400"
                      />
                      <TcText
                        text={
                          schaduledDate
                            ? formatDateToLocalTimezone(schaduledDate)
                            : ''
                        }
                        variant="subtitle2"
                      />
                    </div>
                    {selectedRoles.map((role) => `#${role.name}`).join(', ')}
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="py-6 w-full">
                <TcButton
                  text={'Confirm'}
                  variant="contained"
                  onClick={() => {
                    setConfirmSchadulerDialog(false);
                    handleCreateAnnouncements(false);
                  }}
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
