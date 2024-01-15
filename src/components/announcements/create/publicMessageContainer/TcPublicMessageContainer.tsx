import React, { useContext, useEffect, useState } from 'react';
import TcText from '../../../shared/TcText';
import { MdAnnouncement, MdExpandMore } from 'react-icons/md';
import TcIconContainer from '../TcIconContainer';
import TcSelect from '../../../shared/TcSelect';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormHelperText,
  InputLabel,
} from '@mui/material';
import TcInput from '../../../shared/TcInput';
import TcPublicMessagePreviewDialog from './TcPublicMessagePreviewDialog';
import { ChannelContext } from '../../../../context/ChannelContext';
import TcPlatformChannelList from '../../../communitySettings/platform/TcPlatformChannelList';
import { IGuildChannels } from '../../../../utils/types';

export interface FlattenedChannel {
  id: string;
  label: string;
}

export interface ITcPublicMessageContainerProps {
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
}: ITcPublicMessageContainerProps) {
  const channelContext = useContext(ChannelContext);

  const { channels, selectedSubChannels } = channelContext;

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

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-1 md:space-y-0">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-3">
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
        <div>
          <TcText text="Send message to:" variant="subtitle1" />
          <TcText
            text="The announcement will be sent by the a bot which will have access to send the following message within the selected channels"
            variant="caption"
            className="text-gray-400"
          />
        </div>
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
              <div>
                <Accordion disableGutters defaultExpanded={false} elevation={0}>
                  <AccordionSummary
                    expandIcon={
                      <MdExpandMore color="#37474F" size={25} fill="#37474F" />
                    }
                  >
                    <TcText
                      text="Don't see a specific channel?"
                      variant="body2"
                      fontWeight="bold"
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="pl-1 pr-4 text-left">
                      <TcText
                        text="How to give access to the channel you want to import?"
                        variant="subtitle2"
                        fontWeight={300}
                        className="text-gray-500"
                      />
                      <ol className="list-decimal text-sm pl-4">
                        <li>
                          Navigate to the channel you want to import on{' '}
                          <a
                            href="https://discord.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary font-semibold cursor-pointer"
                          >
                            Discord
                          </a>
                        </li>
                        <li>
                          Go to the settings for that specific channel (select
                          the wheel on the right of the channel name)
                        </li>
                        <li>
                          Select <b>Permissions</b> (left sidebar), and then in
                          the middle of the screen check{' '}
                          <b>Advanced permissions</b>
                        </li>
                        <li>
                          With the <b>TogetherCrew Bot</b> selected, under
                          Advanced Permissions, make sure that [View channel]
                          and [Write Access] are marked as [✓]
                        </li>
                        <li>
                          Select the plus sign to the right of Roles/Members and
                          under members select <b>TogetherCrew bot</b>
                        </li>
                        <li>
                          Click on the <b>Refresh List</b> button on this window
                          and select the new channels
                        </li>
                      </ol>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </TcSelect>
        </FormControl>
        <TcText text="Write message here:" variant="subtitle1" />
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
    </div>
  );
}

export default TcPublicMessageContainer;
