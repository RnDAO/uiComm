import React, { useContext } from 'react';
import { FormControlLabel, FormGroup } from '@mui/material';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { BiError } from 'react-icons/bi';
import { TbRefresh } from 'react-icons/tb';

import Loading from '../../global/Loading';
import TcButton from '../../shared/TcButton';
import TcCheckbox from '../../shared/TcCheckbox';
import TcText from '../../shared/TcText';
import { ChannelContext } from '../../../context/ChannelContext';
import { ISubChannels } from '../../../utils/types';

interface ITcPlatformChannelList {
  refreshTrigger: boolean;
  channelListCustomClass?: string;
  disableSubChannelsByAnnouncement: boolean;
}

function TcPlatformChannelList({
  refreshTrigger = true,
  channelListCustomClass,
  disableSubChannelsByAnnouncement = false,
}: ITcPlatformChannelList) {
  const channelContext = useContext(ChannelContext);
  const router = useRouter();

  const id = Array.isArray(router.query.platformId)
    ? router.query.platformId[0]
    : router.query.platformId;

  const {
    channels,
    selectedSubChannels,
    refreshData,
    handleSubChannelChange,
    handleSelectAll,
    loading,
  } = channelContext;

  const handleRefresh = () => {
    if (id) {
      refreshData(id);
    }
  };

  const showErrorMessage = (subChannel: ISubChannels) => {
    return disableSubChannelsByAnnouncement && !subChannel.announcementAccess
      ? !subChannel.announcementAccess
      : !disableSubChannelsByAnnouncement &&
          !subChannel.canReadMessageHistoryAndViewChannel;
  };

  if (loading) {
    return <Loading height='400px' />;
  }

  if (channels.length === 0) {
    return (
      <div className='flex justify-center py-24'>
        <TcText
          text='Channel list is empty'
          variant='body2'
          className='text-gray-400'
        />
      </div>
    );
  }

  return (
    <div className='max-h-[400px] overflow-y-scroll'>
      {refreshTrigger ? (
        <TcButton
          className='sticky top-4 float-right m-4 bg-white'
          startIcon={<TbRefresh />}
          sx={{ maxWidth: '10rem' }}
          variant='outlined'
          onClick={handleRefresh}
          text='Refresh List'
        />
      ) : (
        ''
      )}
      <div
        className={clsx(
          channelListCustomClass ? channelListCustomClass : 'px-6 py-3'
        )}
      >
        {channels &&
          channels?.map((channel, index) => (
            <div key={`${channel.channelId} ${index}`}>
              <TcText variant='h6' text={channel.title} />
              <div className='ml-5'>
                <FormControlLabel
                  control={
                    <TcCheckbox
                      checked={channel?.subChannels?.every(
                        (subChannel) =>
                          selectedSubChannels[channel.channelId]?.[
                            subChannel.channelId
                          ]
                      )}
                      onChange={() =>
                        handleSelectAll(channel.channelId, channel?.subChannels)
                      }
                      disabled={channel?.subChannels?.some((subChannel) => {
                        if (disableSubChannelsByAnnouncement) {
                          return !subChannel.announcementAccess;
                        } else {
                          return !subChannel.canReadMessageHistoryAndViewChannel;
                        }
                      })}
                    />
                  }
                  label='All Channels'
                />
                <TcText text='Channels' />
                <FormGroup>
                  {channel.subChannels.map((subChannel, index) => (
                    <div
                      className='flex justify-between'
                      key={`${subChannel.channelId} ${subChannel.parentId} ${index}`}
                    >
                      <FormControlLabel
                        control={
                          <TcCheckbox
                            checked={
                              selectedSubChannels[channel.channelId]?.[
                                subChannel.channelId
                              ] || false
                            }
                            disabled={
                              disableSubChannelsByAnnouncement &&
                              !subChannel.announcementAccess
                                ? !subChannel.announcementAccess
                                : !disableSubChannelsByAnnouncement &&
                                  !subChannel.canReadMessageHistoryAndViewChannel
                            }
                            onChange={() =>
                              handleSubChannelChange(
                                channel.channelId,
                                subChannel.channelId
                              )
                            }
                          />
                        }
                        label={subChannel.name}
                      />
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
                  ))}
                </FormGroup>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TcPlatformChannelList;
