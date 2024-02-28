import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineAnnouncement } from 'react-icons/md';

import TcPrivateMessagePreviewDialog from './TcPrivateMessagePreviewDialog';
import TcRolesAutoComplete from './TcRolesAutoComplete';
import TcSafetyMessageChannels from './TcSafetyMessageChannels';
import TcUsersAutoComplete from './TcUsersAutoComplete';
import TcIconContainer from '../TcIconContainer';
import {
  DiscordData,
  DiscordPrivateOptions,
} from '../../../../pages/announcements/edit-announcements';
import useAppStore from '../../../../store/useStore';
import { IRoles, IUser } from '../../../../utils/interfaces';
import TcButton from '../../../shared/TcButton';
import TcButtonGroup from '../../../shared/TcButtonGroup';
import TcIconWithTooltip from '../../../shared/TcIconWithTooltip';
import TcInput from '../../../shared/TcInput';
import TcSelect from '../../../shared/TcSelect';
import TcSwitch from '../../../shared/TcSwitch';
import TcText from '../../../shared/TcText';
import { ChannelContext } from '../../../../context/ChannelContext';

export enum MessageType {
  AllTypes = 'All Types',
  CategoryOnly = 'Category Only',
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
    selectedEngagementCategory,
    safetyChannelIds,
  }: {
    message: string;
    selectedRoles?: IRoles[];
    selectedUsers?: IUser[];
    selectedEngagementCategory?: string[];

    safetyChannelIds?: string;
  }) => void;
}

function TcPrivateMessageContainer({
  handlePrivateAnnouncements,
  isEdit = false,
  privateAnnouncementsData,
}: ITcPrivateMessageContainerProps) {
  const { retrieveCategories } = useAppStore();

  const channelContext = useContext(ChannelContext);
  const { channels } = channelContext;

  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);

  const [privateMessage, setPrivateMessage] = useState<boolean>(false);
  const [messageType, setMessageType] = useState<MessageType>(
    MessageType.AllTypes
  );
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<IRoles[]>([]);
  const [selectedEngagementCategory, setSelectedEngagementCategory] = useState<
    string[]
  >([]);
  const [safetyChannelIds, setSafetyChannelIds] = useState<string>('');

  const [message, setMessage] = useState<string>('');
  const [messageError, setMessageError] = useState<string>('');

  useEffect(() => {
    validateMessage();
  }, [message]);

  const validateMessage = () => {
    if (privateMessage && !message.trim()) {
      setMessageError('Message cannot be empty.');
    } else {
      setMessageError('');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handlePrivateMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.checked) {
      setMessageError('');
    }
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

  const getSelectedSafetyChannelLabel = (() => {
    for (const channel of channels) {
      const subChannel = channel.subChannels.find(
        (subChannel) => subChannel.channelId === safetyChannelIds
      );
      if (subChannel) return subChannel.name;
    }
    return '';
  })();

  useEffect(() => {
    const prepareAndSendData = () => {
      switch (messageType) {
        case MessageType.AllTypes:
          handlePrivateAnnouncements({
            message,
            selectedRoles,
            selectedUsers,
            selectedEngagementCategory,
            safetyChannelIds,
          });
          break;

        case MessageType.CategoryOnly:
          handlePrivateAnnouncements({
            message,
            selectedEngagementCategory,
            safetyChannelIds,
          });
          break;

        case MessageType.RoleOnly:
          handlePrivateAnnouncements({
            message,
            selectedRoles,
            safetyChannelIds,
          });
          break;

        case MessageType.UserOnly:
          handlePrivateAnnouncements({
            message,
            selectedUsers,
            safetyChannelIds,
          });
          break;

        default:
          handlePrivateAnnouncements({
            message,
            selectedRoles,
            selectedUsers,
            selectedEngagementCategory,
            safetyChannelIds,
          });
          break;
      }
    };
    if (!privateMessage) {
      handlePrivateAnnouncements({
        message: '',
        selectedRoles: [],
        selectedUsers: [],
        selectedEngagementCategory: [],
        safetyChannelIds: '',
      });
    } else {
      if (
        message &&
        selectedRoles &&
        selectedUsers &&
        selectedEngagementCategory &&
        safetyChannelIds
      ) {
        prepareAndSendData();
      }
    }
  }, [
    privateMessage,
    message,
    selectedRoles,
    selectedUsers,
    messageType,
    safetyChannelIds,
    selectedEngagementCategory,
  ]);

  const [categoryError, setCategoryError] = useState<string>('');
  const [roleError, setRoleError] = useState<string>('');
  const [userError, setUserError] = useState<string>('');

  useEffect(() => {
    setCategoryError('');
    setRoleError('');
    setUserError('');

    if (messageType === MessageType.CategoryOnly) {
      if (selectedEngagementCategory.length === 0) {
        setCategoryError('Please select at least one category');
      }
    } else if (messageType === MessageType.RoleOnly) {
      if (selectedRoles.length === 0) {
        setRoleError('Please select at least one role');
      }
    } else if (messageType === MessageType.UserOnly) {
      if (selectedUsers.length === 0) {
        setUserError('Please select at least one user');
      }
    } else if (messageType === MessageType.AllTypes) {
      let hasError = false;
      if (selectedEngagementCategory.length === 0) {
        setCategoryError('Please select at least one category');
        hasError = true;
      }
      if (selectedRoles.length === 0) {
        setRoleError('Please select at least one role');
        hasError = true;
      }
      if (selectedUsers.length === 0) {
        setUserError('Please select at least one user');
        hasError = true;
      }

      if (!hasError) {
        setCategoryError('');
        setRoleError('');
        setUserError('');
      }
    }
  }, [messageType, selectedEngagementCategory, selectedRoles, selectedUsers]);

  useEffect(() => {
    if (isEdit && privateAnnouncementsData) {
      const rolesArray: IRoles[] = [];
      const usersArray: IUser[] = [];
      let engagementCategoriesArray: string[] = [];
      let safetyChannelId: string = '';
      let templateText = '';

      privateAnnouncementsData.forEach((item) => {
        if (item.type === 'discord_private') {
          const privateOptions = item.options as DiscordPrivateOptions;

          if (privateOptions.roles && privateOptions.roles.length > 0) {
            rolesArray.push(...privateOptions.roles);
          }

          if (privateOptions.users && privateOptions.users.length > 0) {
            usersArray.push(...privateOptions.users);
          }

          if (privateOptions.safetyMessageChannel) {
            safetyChannelId = privateOptions.safetyMessageChannel.channelId;
          }

          if (
            privateOptions.engagementCategories &&
            privateOptions.engagementCategories.length > 0
          ) {
            engagementCategoriesArray = [
              ...privateOptions.engagementCategories,
            ];
          }

          if (!templateText) {
            templateText = item.template;
            setPrivateMessage(true);
          }
        }
      });

      setSelectedRoles(rolesArray);
      setSelectedUsers(usersArray);
      setSafetyChannelIds(safetyChannelId);
      setSelectedEngagementCategory(engagementCategoriesArray);
      setMessage(templateText);

      if (
        engagementCategoriesArray.length > 0 &&
        rolesArray.length === 0 &&
        usersArray.length === 0
      ) {
        setMessageType(MessageType.CategoryOnly);
      } else if (
        rolesArray.length > 0 &&
        engagementCategoriesArray.length === 0 &&
        usersArray.length === 0
      ) {
        setMessageType(MessageType.RoleOnly);
      } else if (
        usersArray.length > 0 &&
        engagementCategoriesArray.length === 0 &&
        rolesArray.length === 0
      ) {
        setMessageType(MessageType.UserOnly);
      } else if (
        rolesArray.length > 0 ||
        usersArray.length > 0 ||
        engagementCategoriesArray.length > 0
      ) {
        setMessageType(MessageType.AllTypes);
      }
    }
  }, [isEdit, privateAnnouncementsData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await retrieveCategories();
        setCategories(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value;

    setSelectedEngagementCategory(
      typeof value === 'string' ? value.split(',') : (value as string[])
    );
  };

  const handleSelectedSafetyMessageChannels = (safetyChannelIds: string) => {
    setSafetyChannelIds(safetyChannelIds);
  };

  return (
    <div className='space-y-3'>
      <div className='flex flex-col space-y-1 md:flex-row md:items-center md:justify-between md:space-y-0'>
        <div className='flex flex-col md:flex-row md:items-center md:space-x-3'>
          <TcIconContainer>
            <MdOutlineAnnouncement size={20} />
          </TcIconContainer>
          <TcText text='Private Message' variant='body1' fontWeight='700' />
          <FormControlLabel
            className='mx-auto md:mx-0'
            control={
              <TcSwitch
                onChange={handlePrivateMessageChange}
                checked={privateMessage}
              />
            }
            label={
              <div className='flex items-center space-x-1'>
                <TcIconWithTooltip tooltipText='Community members who have their DMs open will receive a DM. Members who have their DMs closed, will receive a private message inside the server (only they can see it). Additionally, a public message will always be sent with instructions to verify the legitimacy of the bot and announcement by checking the bot ID.' />
              </div>
            }
          />
        </div>
        <div className='flex flex-col items-center space-y-3 md:flex-row md:justify-end md:space-y-0 md:space-x-3'>
          <TcButtonGroup
            disableElevation
            disabled={!privateMessage}
            className='w-full'
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
            selectedEngagementCategory={selectedEngagementCategory}
            safetyChannel={getSelectedSafetyChannelLabel}
            isPreviewDialogEnabled={isPreviewDialogEnabled}
          />
        </div>
      </div>
      {privateMessage && (
        <div className='space-y-1.5'>
          <div>
            <TcText text='Send message to:' variant='subtitle1' />
            <TcText
              text='Choose one or more user selection criteria for DM recipients. If multiple criteria are selected (e.g., Engagement Category + Roles), users matching either will be messaged.'
              variant='caption'
              className='text-gray-400'
            />
          </div>
          <FormControl
            variant='filled'
            fullWidth
            size='medium'
            disabled={
              messageType !== MessageType.AllTypes &&
              messageType !== MessageType.CategoryOnly
            }
          >
            <InputLabel id='select-standard-label'>
              Select Engagement Category(ies)
            </InputLabel>
            <TcSelect
              multiple
              labelId='select-standard-label'
              id='select-standard-label'
              options={categories}
              value={selectedEngagementCategory}
              onChange={handleCategoryChange}
              renderValue={(selected) => (selected as string[]).join(', ')}
              label='Select Engagement Category(ies)'
              MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
            />
            <FormHelperText>
              {categoryError && (
                <div className='text-red-500'>{categoryError}</div>
              )}
            </FormHelperText>
          </FormControl>
          <div className='flex flex-col justify-between space-y-3 md:flex-row md:space-y-0 md:space-x-3'>
            <FormControl
              variant='filled'
              fullWidth
              size='medium'
              disabled={
                messageType !== MessageType.AllTypes &&
                messageType !== MessageType.RoleOnly
              }
            >
              <TcRolesAutoComplete
                isDisabled={
                  messageType !== MessageType.AllTypes &&
                  messageType !== MessageType.RoleOnly
                }
                isEdit={true}
                privateSelectedRoles={selectedRoles}
                handleSelectedUsers={setSelectedRoles}
              />
              <FormHelperText>
                {roleError && <div className='text-red-500'>{roleError}</div>}
              </FormHelperText>
            </FormControl>
            <FormControl
              variant='filled'
              fullWidth
              size='medium'
              disabled={
                messageType !== MessageType.AllTypes &&
                messageType !== MessageType.UserOnly
              }
            >
              <TcUsersAutoComplete
                isDisabled={
                  messageType !== MessageType.AllTypes &&
                  messageType !== MessageType.UserOnly
                }
                isEdit={true}
                privateSelectedUsers={selectedUsers}
                handleSelectedUsers={setSelectedUsers}
              />
              <FormHelperText>
                {userError && <div className='text-red-500'>{userError}</div>}
              </FormHelperText>
            </FormControl>
          </div>
          <div>
            <TcText text='Write message here:' variant='subtitle1' />
            <TcText
              text="Personalize your messages with dynamic variables like {{{username}}}, which the tool replaces automatically with the recipient's username."
              variant='caption'
              className='text-gray-400'
            />
          </div>
          <FormControl variant='filled' fullWidth size='medium'>
            <TcInput
              label='Message'
              variant='filled'
              placeholder='Write your message here'
              rows={2}
              multiline
              value={message}
              onChange={handleChange}
              error={!!messageError}
              helperText={
                messageError ||
                `${message.length} character${message.length !== 1 ? 's' : ''}`
              }
            />
          </FormControl>
          <TcText
            text={
              <>
                Safety Message
                <TcIconWithTooltip
                  tooltipText='The safety message is a s follows:
                To verify the legitimacy of a message by the TogetherCrew bot, check the ID: TogetherCrew Bot#2107 and go to RnDAO'
                />
              </>
            }
            className='flex items-center space-x-3'
            variant='subtitle1'
          />
          <TcText
            className='text-gray-400'
            text='Select a public channel where we’ll send instructions for your users to learn how to verify the bot ID and confirm the legitimacy of the private message they receive.'
            variant='caption'
          />
          <TcSafetyMessageChannels
            handleSelectedSafetyMessageChannels={
              handleSelectedSafetyMessageChannels
            }
            isEdit={isEdit}
            defaultSaftyMessageChannels={safetyChannelIds}
          />
        </div>
      )}
    </div>
  );
}

export default TcPrivateMessageContainer;
