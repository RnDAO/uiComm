import { TreeItem, TreeView } from '@mui/lab';
import { FormControlLabel } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { MdCalendarMonth, MdExpandMore } from 'react-icons/md';
import { MdChevronRight } from 'react-icons/md';
import { TbRefresh } from 'react-icons/tb';

import Loading from '../../global/Loading';
import TcButton from '../../shared/TcButton';
import TcDatePickerPopover from '../../shared/TcDatePickerPopover';
import TcIconWithTooltip from '../../shared/TcIconWithTooltip';
import TcSwitch from '../../shared/TcSwitch';
import TcText from '../../shared/TcText';
import { Channel } from '../../../context/ChannelContext';
import useAppStore from '../../../store/useStore';
import { IPlatformProps } from '../../../utils/interfaces';

interface TcHivemindDiscordLearningsProps {
  platform: IPlatformProps;
  defaultLearningModuleConfig?: {
    selectedChannels: string[];
    fromDate: string;
  } | null;
  handleModuleConfigChange: (config: {
    selectedChannels: string[];
    fromDate: string;
  }) => void;
}

function TcHivemindDiscordLearnings({
  platform,
  defaultLearningModuleConfig,
  handleModuleConfigChange,
}: TcHivemindDiscordLearningsProps) {
  const { retrievePlatformProperties } = useAppStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [discordPlatformChannels, setDiscordPlatformChannels] = useState<
    Channel[]
  >([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [dateTimeDisplay, setDateTimeDisplay] = useState<string>('Filter Date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const fetchDiscordPlatformProperties = async () => {
    try {
      if (!platform) return;
      setIsLoading(true);
      const { selectedChannels } = platform.metadata;

      setSelectedChannels(selectedChannels);

      if (defaultLearningModuleConfig) {
        setSelectedDate(new Date(defaultLearningModuleConfig.fromDate));
        setDateTimeDisplay(
          moment(defaultLearningModuleConfig.fromDate).format('D MMMM YYYY')
        );
        setSelectedChannels(defaultLearningModuleConfig.selectedChannels);
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

  const open = Boolean(anchorEl);
  const id = open ? 'date-time-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      const fullDateTime = moment(date);
      setDateTimeDisplay(fullDateTime.format('D MMMM YYYY'));

      setAnchorEl(null);
    }
  };

  const resetDateFilter = () => {
    setSelectedDate(null);
    setDateTimeDisplay('Filter Date');

    setAnchorEl(null);
  };

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
      fromDate: selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : '',
    });
  }, [selectedChannels, selectedDate]);

  return (
    <div className='md:w-1/2'>
      <div className='flex items-center'>
        <TcText text='Learnings' variant='h6' />
        <TcIconWithTooltip tooltipText='select the channels and sources from which the Hivemind AI will gather information to answer questions.' />
      </div>
      <div className='h-[23rem] overflow-y-scroll rounded-md border border-gray-400 bg-gray-50 p-4'>
        <div className='mb-2 flex flex-col md:flex-row md:items-center md:justify-between'>
          <TcText text='Select the data extraction period' variant='h6' />
          <div className='flex items-center space-x-1.5'>
            <TcIconWithTooltip tooltipText='select the date from which data will be analysed and fed to Hivemind. We recommend 3 months to start.' />
            <TcButton
              variant='outlined'
              startIcon={<MdCalendarMonth />}
              onClick={handleClick}
              text={dateTimeDisplay}
              aria-describedby={id}
            />
            <TcDatePickerPopover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              onResetDate={resetDateFilter}
              disableDaysFrom={35}
            />
          </div>
        </div>
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
                            selectedChannels.includes(subChannel.channelId)
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

export default TcHivemindDiscordLearnings;
