import React, { useContext, useEffect } from 'react';
import { FormControlLabel, FormGroup } from '@mui/material';
import TcCheckbox from '../../shared/TcCheckbox';
import TcText from '../../shared/TcText';
import TcButton from '../../shared/TcButton';
import { TbRefresh } from 'react-icons/tb';
import Loading from '../../global/Loading';
import { ChannelContext } from '../../../context/ChannelContext';
import { useRouter } from 'next/router';
import clsx from 'clsx';

interface ITcPlatformChannelList {
  refreshTrigger: boolean;
  channelListCustomClass?: string;
}

function TcPlatformChannelList({
  refreshTrigger = true,
  channelListCustomClass,
}: ITcPlatformChannelList) {
  const channelContext = useContext(ChannelContext);
  const router = useRouter();

  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;

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

  if (loading) {
    return <Loading height="400px" />;
  }

  if (channels.length === 0) {
    return (
      <div className="flex justify-center py-24">
        <TcText
          text={'Channel list is empty'}
          variant="body2"
          className="text-gray-400"
        />
      </div>
    );
  }

  return (
    <div className="max-h-[400px] overflow-y-scroll">
      {refreshTrigger ? (
        <TcButton
          className="sticky top-4 float-right m-4"
          startIcon={<TbRefresh />}
          sx={{ maxWidth: '10rem' }}
          variant="outlined"
          onClick={handleRefresh}
          text={'Refresh List'}
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
          channels?.map((channel) => (
            <div key={channel.channelId}>
              <TcText variant="h6" text={channel.title} />
              <div className="ml-5">
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
                    />
                  }
                  label="Select All"
                />
                <TcText text="Channels" />
                <FormGroup>
                  {channel.subChannels.map((subChannel) => (
                    <FormControlLabel
                      key={subChannel.channelId}
                      control={
                        <TcCheckbox
                          checked={
                            selectedSubChannels[channel.channelId]?.[
                              subChannel.channelId
                            ] || false
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
