import { FormControl, InputLabel, MenuItem } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { BiError } from 'react-icons/bi';

import { ChannelContext } from '../../../../context/ChannelContext';
import { ISubChannels } from '../../../../utils/types';
import TcSelect from '../../../shared/TcSelect';
import TcText from '../../../shared/TcText';

interface ITcSafetyMessageChannels {
  isEdit: boolean;
  defaultSaftyMessageChannels: string;
  handleSelectedSafetyMessageChannels: (channel: string) => void;
}

function TcSafetyMessageChannels({
  isEdit = false,
  defaultSaftyMessageChannels,
  handleSelectedSafetyMessageChannels,
}: ITcSafetyMessageChannels) {
  const channelContext = useContext(ChannelContext);
  const { channels } = channelContext;

  const [selectedChannels, setSelectedChannels] = useState<ISubChannels | null>(
    null
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSelectedChannels = (channel: ISubChannels) => {
    setSelectedChannels(channel);
    setIsDropdownVisible(false);
  };

  const toggleDropdownVisibility = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    if (selectedChannels !== null) {
      handleSelectedSafetyMessageChannels(selectedChannels.channelId);
    }
  }, [selectedChannels]);

  useEffect(() => {
    if (isEdit) {
      const selectedChannel = channels.find((channel) => {
        return channel.subChannels.find(
          (subChannel) => subChannel.channelId === defaultSaftyMessageChannels
        );
      });

      setSelectedChannels(selectedChannel?.subChannels[0] || null);
    }
  }, [isEdit]);

  return (
    <>
      <FormControl variant='filled' fullWidth size='medium'>
        <InputLabel id='safety-channels' shrink={selectedChannels !== null}>
          Select Channels
        </InputLabel>
        <TcSelect
          labelId='safety-channels'
          value={selectedChannels}
          open={isDropdownVisible}
          onOpen={toggleDropdownVisibility}
          onClose={() => setIsDropdownVisible(false)}
          renderValue={(selected) => (selected as ISubChannels).name || ''}
        >
          <div className='max-h-[200px] overflow-y-scroll'>
            {channels.map((channel, index) => (
              <React.Fragment key={index}>
                <div className='pl-4'>
                  <TcText
                    text={channel.title}
                    variant='subtitle1'
                    fontWeight='bold'
                  />
                  <TcText
                    text='Channels'
                    variant='subtitle1'
                    fontWeight='bold'
                  />
                </div>
                {channel.subChannels.map((subChannel) => (
                  <MenuItem
                    value={subChannel.channelId}
                    key={subChannel.channelId}
                    onClick={() => handleSelectedChannels(subChannel)}
                    disabled={
                      !subChannel.canReadMessageHistoryAndViewChannel ||
                      !subChannel.announcementAccess
                    }
                  >
                    <div className='flex w-full justify-between'>
                      {subChannel.name}
                      {!subChannel.canReadMessageHistoryAndViewChannel ||
                      !subChannel.announcementAccess ? (
                        <div className='flex items-center space-x-1'>
                          <BiError className='text-error-500' />
                          <TcText
                            className='text-error-500'
                            text='Bot needs access'
                          />
                        </div>
                      ) : null}
                    </div>
                  </MenuItem>
                ))}
              </React.Fragment>
            ))}
          </div>
        </TcSelect>
      </FormControl>
    </>
  );
}

export default TcSafetyMessageChannels;
