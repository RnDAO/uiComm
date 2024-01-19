import React, { useEffect, useState } from 'react';
import TcText from '../../../shared/TcText';
import { MdOutlineAnnouncement } from 'react-icons/md';
import TcIconContainer from '../TcIconContainer';
import TcButton from '../../../shared/TcButton';
import { FormControl, FormControlLabel } from '@mui/material';
import TcInput from '../../../shared/TcInput';
import TcSwitch from '../../../shared/TcSwitch';
import TcIconWithTooltip from '../../../shared/TcIconWithTooltip';
import TcButtonGroup from '../../../shared/TcButtonGroup';
import clsx from 'clsx';
import TcPrivateMessagePreviewDialog from './TcPrivateMessagePreviewDialog';
import TcRolesAutoComplete from './TcRolesAutoComplete';
import TcUsersAutoComplete from './TcUsersAutoComplete';
import { IRoles, IUser } from '../../../../utils/interfaces';
import {
  DiscordData,
  DiscordPrivateOptions,
} from '../../../../pages/announcements/edit-announcements';

export enum MessageType {
  Both = 'Both',
  RoleOnly = 'Role Only',
  UserOnly = 'User Only',
}

export interface ITcPrivateMessageContainerProps {
  isEdit?: boolean;
  privateAnnouncementsData?: DiscordData[] | undefined;
  handlePrivateAnnouncements: ({
    message,
    selectedRoles,
    selectedUsers,
  }: {
    message: string;
    selectedRoles?: IRoles[];
    selectedUsers?: IUser[];
  }) => void;
}

function TcPrivateMessageContainer({
  handlePrivateAnnouncements,
  isEdit = false,
  privateAnnouncementsData,
}: ITcPrivateMessageContainerProps) {
  const [privateMessage, setPrivateMessage] = useState<boolean>(false);
  const [messageType, setMessageType] = useState<MessageType>(MessageType.Both);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<IRoles[]>([]);

  const [message, setMessage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handlePrivateMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrivateMessage(event.target.checked);
  };

  const messageTypesArray = Object.values(MessageType);

  const isPreviewDialogEnabled = message.length > 0 && privateMessage == true;

  const getSelectedRolesLabels = () => {
    return selectedRoles.map((role) => role.name || '');
  };

  const selectedRolesLables = getSelectedRolesLabels();

  const getSelectedUsersLabels = () => {
    return selectedUsers.map((user) => user.ngu || '');
  };

  const selectedUsersLables = getSelectedUsersLabels();

  useEffect(() => {
    const prepareAndSendData = () => {
      switch (messageType) {
        case MessageType.Both:
          handlePrivateAnnouncements({ message, selectedRoles, selectedUsers });
          break;

        case MessageType.RoleOnly:
          handlePrivateAnnouncements({ message, selectedRoles });
          break;

        case MessageType.UserOnly:
          handlePrivateAnnouncements({ message, selectedUsers });
          break;

        default:
          handlePrivateAnnouncements({ message, selectedRoles, selectedUsers });
          break;
      }
    };

    if (message && privateMessage) {
      prepareAndSendData();
    }
  }, [
    message,
    selectedRoles,
    selectedUsers,
    messageType,
    privateMessage,
    handlePrivateAnnouncements,
  ]);

  useEffect(() => {
    if (isEdit && privateAnnouncementsData) {
      const rolesArray: IRoles[] = [];
      const usersArray: IUser[] = [];
      let templateText = '';

      privateAnnouncementsData.forEach((item) => {
        if (item.type === 'discord_private') {
          const privateOptions = item.options as DiscordPrivateOptions;

          if (privateOptions.roles) {
            rolesArray.push(...privateOptions.roles);
          }

          if (privateOptions.users) {
            usersArray.push(...privateOptions.users);
          }

          if (!templateText) {
            templateText = item.template;
            setPrivateMessage(true);
          }
        }
      });

      setSelectedRoles(rolesArray);
      setSelectedUsers(usersArray);
      setMessage(templateText);
    }
  }, [isEdit, privateAnnouncementsData]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-1 md:space-y-0">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-3">
          <TcIconContainer>
            <MdOutlineAnnouncement size={20} />
          </TcIconContainer>
          <TcText text="Private Message" variant="body1" fontWeight="700" />
          <FormControlLabel
            className="mx-auto md:mx-0"
            control={
              <TcSwitch
                onChange={handlePrivateMessageChange}
                checked={privateMessage}
              />
            }
            label={
              <div className="flex items-center space-x-1">
                <TcText text="Direct Message (optional)" variant="body1" />
                <TcIconWithTooltip
                  tooltipText={
                    'Community members who have their DMs open will receive a DM. Members who have their DMs closed, will receive a private message inside the server (only they can see it). Additionally, a public message will always be sent with instructions to verify the legitimacy of the bot and announcement by checking the bot ID.'
                  }
                />
              </div>
            }
          />
        </div>
        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-end md:space-x-3 items-center">
          <TcButtonGroup
            disableElevation
            disabled={!privateMessage}
            className="w-full"
          >
            {messageTypesArray.map((el) => (
              <TcButton
                key={el}
                disableElevation={true}
                text={el}
                className={clsx(
                  el === messageType
                    ? 'border border-gray-300 bg-gray-200'
                    : 'border border-gray-300 bg-white'
                )}
                sx={{
                  width: 'auto',
                  padding: {
                    xs: 'auto',
                    sm: '0.4rem 1rem',
                  },
                }}
                onClick={() => setMessageType(el)}
              />
            ))}
          </TcButtonGroup>
          <TcPrivateMessagePreviewDialog
            textMessage={message}
            selectedUsernames={selectedUsersLables}
            selectedRoles={selectedRolesLables}
            isPreviewDialogEnabled={isPreviewDialogEnabled}
          />
        </div>
      </div>
      {privateMessage && (
        <div className="space-y-1.5">
          <div>
            <TcText text="Send message to:" variant="subtitle1" />
            <TcText
              text="Choose one or more user selection criteria for DM recipients. If multiple criteria are selected (e.g., Users + Roles), users matching either will be messaged."
              variant="caption"
              className="text-gray-400"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 md:space-x-3">
            <FormControl
              variant="filled"
              fullWidth
              size="medium"
              disabled={
                messageType !== MessageType.Both &&
                messageType !== MessageType.RoleOnly
              }
            >
              <TcRolesAutoComplete
                isDisabled={
                  messageType !== MessageType.Both &&
                  messageType !== MessageType.RoleOnly
                }
                isEdit={true}
                privateSelectedRoles={selectedRoles}
                handleSelectedUsers={setSelectedRoles}
              />
            </FormControl>
            <FormControl
              variant="filled"
              fullWidth
              size="medium"
              disabled={
                messageType !== MessageType.Both &&
                messageType !== MessageType.UserOnly
              }
            >
              <TcUsersAutoComplete
                isDisabled={
                  messageType !== MessageType.Both &&
                  messageType !== MessageType.UserOnly
                }
                isEdit={true}
                privateSelectedUsers={selectedUsers}
                handleSelectedUsers={setSelectedUsers}
              />
            </FormControl>
          </div>
          <div>
            <TcText text="Write message here:" variant="subtitle1" />
            <TcText
              text="Personalize your messages with dynamic variables like {{username}}, which the tool replaces automatically with the recipient's username."
              variant="caption"
              className="text-gray-400"
            />
          </div>
          <FormControl variant="filled" fullWidth size="medium">
            <TcInput
              label="Message"
              variant="filled"
              placeholder="Write your message here"
              rows={2}
              multiline
              value={message}
              onChange={handleChange}
              helperText={`${message.length} character${
                message.length !== 1 ? 's' : ''
              }`}
            />
          </FormControl>
        </div>
      )}
    </div>
  );
}

export default TcPrivateMessageContainer;
