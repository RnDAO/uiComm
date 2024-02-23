import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import { MdAnnouncement } from 'react-icons/md';

import TcPublicMessagePreviewDialog from './TcPublicMessagePreviewDialog';
import TcIconContainer from '../TcIconContainer';
import { conf } from '../../../../configs';
import { ChannelContext } from '../../../../context/ChannelContext';
import { useToken } from '../../../../context/TokenContext';
import { flattenChannels } from '../../../../helpers/helper';
import { DiscordData } from '../../../../pages/announcements/edit-announcements';
import TcPlatformChannelList from '../../../communitySettings/platform/TcPlatformChannelList';
import TcButton from '../../../shared/TcButton';
import TcInput from '../../../shared/TcInput';
import TcSelect from '../../../shared/TcSelect';
import TcSwitch from '../../../shared/TcSwitch';
import TcText from '../../../shared/TcText';

export interface FlattenedChannel {
  id: string;
  label: string;
}

export interface ITcPublicMessageContainerProps {
  isEdit?: boolean;
  publicAnnouncementsData?: DiscordData | undefined;
  handlePublicAnnouncements: ({
    message,
    selectedChannels,
  }: {
    message: string;
    selectedChannels: FlattenedChannel[] | [];
  }) => void;
}

function TcPublicMessageContainer({
  handlePublicAnnouncements,
  isEdit = false,
  publicAnnouncementsData,
}: ITcPublicMessageContainerProps) {
  const channelContext = useContext(ChannelContext);

  const { channels, selectedSubChannels, refreshData } = channelContext;

  const { community } = useToken();

  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const platformId = community?.platforms.find(
    (platform) => platform.disconnectedAt === null
  )?.id;

  const [selectedChannels, setSelectedChannels] = useState<FlattenedChannel[]>(
    []
  );
  const [confirmedSelectedChannels, setConfirmedSelectedChannels] =
    useState<boolean>(false);

  useEffect(() => {
    setSelectedChannels(flattenChannels(channels, selectedSubChannels));
  }, [channels, selectedSubChannels]);

  const [message, setMessage] = useState<string>('');
  const [messageError, setMessageError] = useState<string>('');
  const [publicMessage, setPublicMessage] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    validateMessage();
  }, [message]);

  const validateMessage = () => {
    if (publicMessage && !message.trim()) {
      setMessageError('Message cannot be empty.');
    } else {
      setMessageError('');
    }
  };

  const isPreviewDialogEnabled =
    selectedChannels.length > 0 && message.length > 0;

  useEffect(() => {
    const prepareAndSendData = () => {
      if (confirmedSelectedChannels) {
        handlePublicAnnouncements({ message, selectedChannels });
      } else {
        handlePublicAnnouncements({ message, selectedChannels: [] });
      }
    };
    if (message && selectedChannels) {
      prepareAndSendData();
    }
  }, [message, selectedChannels, confirmedSelectedChannels]);

  useEffect(() => {
    if (isEdit && publicAnnouncementsData) {
      if (
        publicAnnouncementsData.type === 'discord_public' &&
        'channels' in publicAnnouncementsData.options
      ) {
        const formattedChannels = publicAnnouncementsData.options.channels.map(
          (channel) => ({
            id: channel.channelId,
            label: channel.name,
          })
        );
        setPublicMessage(true);
        setConfirmedSelectedChannels(true);
        setSelectedChannels(formattedChannels);
        setMessage(publicAnnouncementsData.template);
      }
    }
  }, [isEdit, publicAnnouncementsData]);

  const handleSaveChannels = () => {
    setConfirmedSelectedChannels(true);
    setIsDropdownVisible(false);
    setShowError(hasInteracted && selectedChannels.length === 0);
  };

  const toggleDropdownVisibility = () => {
    setHasInteracted(true);
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handlePublicMessaageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.checked) {
      setShowError(false);
      setMessageError('');
    }
    setPublicMessage(event.target.checked);
  };

  useEffect(() => {
    if (!isEdit && !publicMessage) {
      setShowError(false);
      setMessageError('');
      setSelectedChannels([]);
      setMessage('');
      handlePublicAnnouncements({ message, selectedChannels: [] });
    }
  }, [isEdit, publicMessage]);

  const refreshChannels = async () => {
    try {
      if (!platformId) return;
      await refreshData(platformId, 'channel', undefined, undefined, false);
    } catch (error) {}
  };

  return (
    <div className='space-y-3'>
      <div className='flex flex-col space-y-1 md:flex-row md:items-center md:justify-between md:space-y-0'>
        <div className='flex flex-col md:flex-row md:items-center md:space-x-3'>
          <TcIconContainer>
            <MdAnnouncement size={20} />
          </TcIconContainer>
          <TcText text='Public Message' variant='body1' fontWeight='700' />
          <FormControlLabel
            className='mx-auto md:mx-0'
            control={
              <TcSwitch
                onChange={handlePublicMessaageChange}
                checked={publicMessage}
              />
            }
            label={undefined}
          />
        </div>
        <TcPublicMessagePreviewDialog
          textMessage={message}
          isPreviewDialogEnabled={isPreviewDialogEnabled}
          selectedChannels={selectedChannels.map((channel) => channel.label)}
        />
      </div>
      {publicMessage && (
        <div className='space-y-1.5'>
          <FormControl variant='filled' fullWidth size='medium'>
            <InputLabel id='select-standard-label'>Select Channels</InputLabel>
            <TcSelect
              multiple
              labelId='select-standard-label'
              id='select-standard-label'
              label='Platform'
              value={selectedChannels}
              open={isDropdownVisible}
              onOpen={toggleDropdownVisibility}
              renderValue={(selected) =>
                (selected as FlattenedChannel[])
                  .map((channel) => `#${channel.label}`)
                  .join(', ')
              }
            >
              <div className='space-y-3 p-4'>
                <div className='rounded-md border border-gray-300'>
                  <TcPlatformChannelList refreshTrigger={false} />
                </div>
                <div className='flex justify-between space-x-3'>
                  <TcButton
                    text='Learn about Permissions'
                    variant='outlined'
                    sx={{ minWidth: '12rem' }}
                    onClick={() =>
                      window.open(
                        `${conf.GITBOOK_URL}/features/smart-announcements#how-to-set-permissions-for-the-smart-announcements-to-work`
                      )
                    }
                  />
                  <div className='flex flex-row items-center space-x-3'>
                    <TcButton
                      startIcon={<BiRefresh size={24} />}
                      text='Refresh List'
                      variant='outlined'
                      sx={{ minWidth: '12rem' }}
                      onClick={refreshChannels}
                    />
                    <TcButton
                      text='Save'
                      variant='contained'
                      sx={{ minWidth: '12rem' }}
                      onClick={handleSaveChannels}
                    />
                  </div>
                </div>
              </div>
            </TcSelect>
            {showError && (
              <FormHelperText>
                <TcText
                  text='Please select at least one channel.'
                  variant='caption'
                  className='text-red-500'
                />
              </FormHelperText>
            )}
          </FormControl>
          <div className='flex flex-col'>
            <TcText text='Write message here:' variant='subtitle1' />
            <TcText
              text='Our bot will distribute the announcement through selected channels with the required access to share the designated message.'
              variant='caption'
              className='text-gray-400'
            />
          </div>
          <FormControl variant='filled' fullWidth size='medium'>
            <TcInput
              label='Message'
              variant='filled'
              placeholder='Write your message here'
              rows={3}
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
        </div>
      )}
    </div>
  );
}

export default TcPublicMessageContainer;
