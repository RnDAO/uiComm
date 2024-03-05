import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from '@mui/material';
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
  disableSubChannelsByAnnouncement?: boolean;
}

function TcSafetyMessageChannels({
  isEdit = false,
  defaultSaftyMessageChannels,
  handleSelectedSafetyMessageChannels,
  disableSubChannelsByAnnouncement = true,
  ...props
}: ITcSafetyMessageChannels) {
  const channelContext = useContext(ChannelContext);
  const { channels } = channelContext;

  const [selectedChannels, setSelectedChannels] = useState<ISubChannels | null>(
    null
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  const validateSelection = (channel: ISubChannels | null) => {
    const isValid = channel !== null;
    setIsValid(isValid);

    return isValid;
  };

  const handleSelectedChannels = (channel: ISubChannels) => {
    setSelectedChannels(channel);
    setIsDropdownVisible(false);
    validateSelection(channel);
  };

  const toggleDropdownVisibility = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    if (selectedChannels !== null) {
      handleSelectedSafetyMessageChannels(selectedChannels.channelId);
    }
    validateSelection(selectedChannels);
  }, [selectedChannels]);

  useEffect(() => {
    if (isEdit) {
      const selectedChannel = channels.find((channel) => {
        return channel.subChannels.find(
          (subChannel) => subChannel.channelId === defaultSaftyMessageChannels
        );
      });
      const initialChannel = selectedChannel?.subChannels[0] || null;
      setSelectedChannels(initialChannel);
      validateSelection(initialChannel);
    }
  }, [isEdit]);

  const showErrorMessage = (subChannel: ISubChannels) => {
    return (disableSubChannelsByAnnouncement &&
      !subChannel.announcementAccess) ||
      subChannel.type !== 0
      ? true
      : false;
  };

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
          {...props}
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
                      (disableSubChannelsByAnnouncement &&
                        !subChannel.announcementAccess) ||
                      subChannel.type !== 0
                    }
                  >
                    <div className='flex w-full justify-between'>
                      {subChannel.name}
                      {showErrorMessage(subChannel) ? (
                        <div className='flex items-center space-x-1'>
                          <BiError className='text-error-500' />
                          <TcText
                            className='text-error-500'
                            text='Bot needs access'
                          />
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </MenuItem>
                ))}
              </React.Fragment>
            ))}
          </div>
        </TcSelect>
        {!isValid && (
          <FormHelperText className='text-error-500'>
            Please select a channel.
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
}

export default TcSafetyMessageChannels;
