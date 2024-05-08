import { TreeItem, TreeView } from '@mui/lab';
import { FormControlLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdChevronRight, MdExpandMore } from 'react-icons/md';
import { TbRefresh } from 'react-icons/tb';

import Loading from '../../global/Loading';
import TcButton from '../../shared/TcButton';
import TcIconWithTooltip from '../../shared/TcIconWithTooltip';
import TcSwitch from '../../shared/TcSwitch';
import TcText from '../../shared/TcText';
import { Channel } from '../../../context/ChannelContext';
import useAppStore from '../../../store/useStore';
import { IPlatformProps } from '../../../utils/interfaces';

interface TcHivemindDiscordAnsweringProps {
  platform: IPlatformProps;
  defaultAnsweringModuleConfig?: {
    selectedChannels: string[];
  } | null;
  handleModuleConfigChange: (config: { selectedChannels: string[] }) => void;
}

function TcHivemindDiscordAnswering({
  platform,
  defaultAnsweringModuleConfig,
  handleModuleConfigChange,
}: TcHivemindDiscordAnsweringProps) {
  const { retrievePlatformProperties } = useAppStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [discordPlatformChannels, setDiscordPlatformChannels] = useState<
    Channel[]
  >([]);

  const fetchDiscordPlatformProperties = async () => {
    try {
      if (!platform) return;
      setIsLoading(true);
      const { selectedChannels } = platform.metadata;

      setSelectedChannels(selectedChannels);

      if (defaultAnsweringModuleConfig) {
        setSelectedChannels(defaultAnsweringModuleConfig.selectedChannels);
      }

      const data = await retrievePlatformProperties({
        platformId: platform.id,
      });

      const analyizedChannels = data
        .map((channel: Channel) => {
          return {
            ...channel,
            subChannels: channel.subChannels.filter((subChannel) =>
              selectedChannels?.includes(subChannel.channelId)
            ),
          };
        })
        .filter((channel: Channel) => channel.subChannels.length > 0);

      setDiscordPlatformChannels(analyizedChannels);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching discord platform properties', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscordPlatformProperties();
  }, [platform]);

  const handleToggleAllSubChannels = (channelId: string, checked: boolean) => {
    const channelIndex = discordPlatformChannels.findIndex(
      (channel) => channel.channelId === channelId
    );
    const subChannels = discordPlatformChannels[channelIndex].subChannels;
    const subChannelIds = subChannels.map((subChannel) => subChannel.channelId);

    if (checked) {
      setSelectedChannels([...selectedChannels, ...subChannelIds]);
    } else {
      setSelectedChannels(
        selectedChannels.filter(
          (channelId) => !subChannelIds.includes(channelId)
        )
      );
    }
  };

  const handleToggleChannelSubChannel = (
    channelId: string,
    subChannelId: string,
    checked: boolean
  ) => {
    if (checked) {
      setSelectedChannels([...selectedChannels, subChannelId]);
    } else {
      setSelectedChannels(
        selectedChannels.filter((channelId) => channelId !== subChannelId)
      );
    }
  };

  useEffect(() => {
    handleModuleConfigChange({
      selectedChannels,
    });
  }, [selectedChannels]);

  return (
    <div className='w-full md:w-1/2'>
      <div className='flex items-center'>
        <TcText text='Answering' variant='h6' />
        <TcIconWithTooltip tooltipText='select the channels in which community members can ask questions to Hivemind using slash command /question.' data-testid="answering-tooltip" />
      </div>
      <div className='h-[23rem] overflow-y-scroll rounded-md border border-gray-400 bg-gray-50 p-4'>
        <TcText text='Select the data extraction period' variant='h6' />
        <div className='flex items-center justify-between'>
          <TcText text='Sync the following data sources' variant='h6' />
          <TcButton
            text='Refresh List'
            variant='outlined'
            className='bg-white'
            startIcon={<TbRefresh />}
            onClick={() => fetchDiscordPlatformProperties()}
          />
        </div>
        {isLoading ? (
          <div className='flex h-60 items-center justify-center'>
            <Loading />
          </div>
        ) : (
          <TreeView
            defaultCollapseIcon={<MdExpandMore />}
            defaultExpandIcon={<MdChevronRight />}
          >
            {discordPlatformChannels.map((channel, index) => (
              <TreeItem
                key={index}
                nodeId={channel.channelId}
                label={
                  <div className='flex items-center justify-between'>
                    <TcText
                      text={channel.title}
                      variant='h6'
                      fontWeight='bold'
                    />
                    <FormControlLabel
                      onClick={(e) => e.stopPropagation()}
                      control={
                        <TcSwitch
                          checked={channel.subChannels.every((subChannel) =>
                            selectedChannels?.includes(subChannel.channelId)
                          )}
                          disabled={channel.subChannels.some(
                            (subChannel) =>
                              !subChannel.canReadMessageHistoryAndViewChannel
                          )}
                          onChange={(e) =>
                            handleToggleAllSubChannels(
                              channel.channelId,
                              e.target.checked
                            )
                          }
                        />
                      }
                      label='Enable All'
                    />
                  </div>
                }
              >
                {channel.subChannels.map((subChannel, index) => (
                  <TreeItem
                    key={index}
                    nodeId={subChannel.channelId}
                    label={
                      <div className='flex items-center justify-between'>
                        <TcText text={subChannel.name} variant='subtitle1' />
                        <FormControlLabel
                          onClick={(e) => e.stopPropagation()}
                          control={
                            <TcSwitch
                              checked={selectedChannels?.includes(
                                subChannel.channelId
                              )}
                              disabled={
                                !subChannel.canReadMessageHistoryAndViewChannel
                              }
                              onChange={(e) =>
                                handleToggleChannelSubChannel(
                                  channel.channelId,
                                  subChannel.channelId,
                                  e.target.checked
                                )
                              }
                            />
                          }
                          label='Enable'
                        />
                      </div>
                    }
                  />
                ))}
              </TreeItem>
            ))}
          </TreeView>
        )}
      </div>
    </div>
  );
}

export default TcHivemindDiscordAnswering;
