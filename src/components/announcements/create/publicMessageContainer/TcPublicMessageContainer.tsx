import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { MdAnnouncement } from 'react-icons/md';

import TcPublicMessagePreviewDialog from './TcPublicMessagePreviewDialog';
import TcIconContainer from '../TcIconContainer';
import { ChannelContext } from '../../../../context/ChannelContext';
import { DiscordData } from '../../../../pages/announcements/edit-announcements';
import { IGuildChannels } from '../../../../utils/types';
import TcPlatformChannelList from '../../../communitySettings/platform/TcPlatformChannelList';
import TcPermissionHints from '../../../global/TcPermissionHints';
import TcButton from '../../../shared/TcButton';
import TcInput from '../../../shared/TcInput';
import TcSelect from '../../../shared/TcSelect';
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

  const { channels, selectedSubChannels } = channelContext;
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const flattenChannels = (channels: IGuildChannels[]): FlattenedChannel[] => {
    const flattened: FlattenedChannel[] = [];

    channels.forEach((channel) => {
      if (channel.subChannels) {
        channel.subChannels.forEach((subChannel) => {
          if (selectedSubChannels[channel.channelId]?.[subChannel.channelId]) {
            flattened.push({
              id: subChannel.channelId,
              label: subChannel.name,
            });
          }
        });
      }
    });

    return flattened;
  };

  const [selectedChannels, setSelectedChannels] = useState<FlattenedChannel[]>(
    []
  );
  const [confirmedSelectedChannels, setConfirmedSelectedChannels] =
    useState<boolean>(false);

  useEffect(() => {
    setSelectedChannels(flattenChannels(channels));
  }, [channels, selectedSubChannels]);

  const [message, setMessage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const isPreviewDialogEnabled =
    selectedChannels.length > 0 && message.length > 0;

  useEffect(() => {
    if (confirmedSelectedChannels) {
      handlePublicAnnouncements({ message, selectedChannels });
    } else {
      handlePublicAnnouncements({ message, selectedChannels: [] });
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

  return (
    <div className='space-y-3'>
      <div className='flex flex-col space-y-1 md:flex-row md:items-center md:justify-between md:space-y-0'>
        <div className='flex flex-row items-center space-x-3'>
          <TcIconContainer>
            <MdAnnouncement size={20} />
          </TcIconContainer>
          <TcText text='Public Message' variant='body1' fontWeight='700' />
        </div>
        <TcPublicMessagePreviewDialog
          textMessage={message}
          isPreviewDialogEnabled={isPreviewDialogEnabled}
          selectedChannels={selectedChannels.map((channel) => channel.label)}
        />
      </div>
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
              <TcPermissionHints />
              <div className='flex justify-end'>
                <TcButton
                  text='Save'
                  variant='contained'
                  sx={{ minWidth: '12rem' }}
                  onClick={handleSaveChannels}
                />
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
            helperText={`${message.length} character${
              message.length !== 1 ? 's' : ''
            }`}
          />
        </FormControl>
      </div>
    </div>
  );
}

export default TcPublicMessageContainer;
