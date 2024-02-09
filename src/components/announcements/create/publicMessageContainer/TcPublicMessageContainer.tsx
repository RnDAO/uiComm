import React, { useContext, useEffect, useState } from 'react';
import TcText from '../../../shared/TcText';
import { MdAnnouncement, MdExpandMore } from 'react-icons/md';
import TcIconContainer from '../TcIconContainer';
import TcSelect from '../../../shared/TcSelect';
import { FormControl, InputLabel } from '@mui/material';
import TcInput from '../../../shared/TcInput';
import TcPublicMessagePreviewDialog from './TcPublicMessagePreviewDialog';
import { ChannelContext } from '../../../../context/ChannelContext';
import TcPlatformChannelList from '../../../communitySettings/platform/TcPlatformChannelList';
import { IGuildChannels } from '../../../../utils/types';
import { DiscordData } from '../../../../pages/announcements/edit-announcements';
import TcPermissionHints from '../../../global/TcPermissionHints';
import { useToken } from '../../../../context/TokenContext';

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
    selectedChannels: FlattenedChannel[];
  }) => void;
}

function TcPublicMessageContainer({
  handlePublicAnnouncements,
  isEdit = false,
  publicAnnouncementsData,
}: ITcPublicMessageContainerProps) {
  const channelContext = useContext(ChannelContext);

  const { channels, selectedSubChannels } = channelContext;
  const { community } = useToken();

  const flattenChannels = (channels: IGuildChannels[]): FlattenedChannel[] => {
    let flattened: FlattenedChannel[] = [];

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
    handlePublicAnnouncements({ message, selectedChannels });
  }, [message, selectedChannels]);

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

        setSelectedChannels(formattedChannels);
        setMessage(publicAnnouncementsData.template);
      }
    }
  }, [isEdit, publicAnnouncementsData]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-1 md:space-y-0">
        <div className="flex flex-row items-center space-x-3">
          <TcIconContainer>
            <MdAnnouncement size={20} />
          </TcIconContainer>
          <TcText text="Public Message" variant="body1" fontWeight="700" />
        </div>
        <TcPublicMessagePreviewDialog
          textMessage={message}
          isPreviewDialogEnabled={isPreviewDialogEnabled}
          selectedChannels={selectedChannels.map((channel) => channel.label)}
        />
      </div>
      <div className="space-y-1.5">
        {/* <div>
          <TcText text="Send message to:" variant="subtitle1" />
          <TcText
            text="Our bot will deliver the announcement across chosen channels with the necessary access to share the specified message."
            variant="caption"
            className="text-gray-400"
          />
        </div> */}
        <FormControl variant="filled" fullWidth size="medium">
          <InputLabel id="select-standard-label">Select Channels</InputLabel>
          <TcSelect
            multiple
            labelId="select-standard-label"
            id="select-standard-label"
            label="Platform"
            value={selectedChannels}
            renderValue={(selected) =>
              (selected as FlattenedChannel[])
                .map((channel) => `#${channel.label}`)
                .join(', ')
            }
          >
            <div className="p-4 space-y-3">
              <div className="border border-gray-300 rounded-md">
                <TcPlatformChannelList refreshTrigger={false} />
              </div>
              <TcPermissionHints />
            </div>
          </TcSelect>
        </FormControl>
        <div className="flex flex-col">
          <TcText text="Write message here:" variant="subtitle1" />
          <TcText
            text="Our bot will distribute the announcement through selected channels with the required access to share the designated message."
            variant="caption"
            className="text-gray-400"
          />
        </div>
        <FormControl variant="filled" fullWidth size="medium">
          <TcInput
            label="Message"
            variant="filled"
            placeholder="Write your message here"
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
