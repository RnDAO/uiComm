import React, { createContext, useState, useContext, useCallback } from 'react';
import useAppStore from '../store/useStore';

export interface SubChannel {
  channelId: string;
  name: string;
  parentId: string;
  canReadMessageHistoryAndViewChannel: boolean;
  announcementAccess: boolean;
}

export interface Channel {
  channelId: string;
  title: string;
  subChannels: SubChannel[];
}

export type SelectedSubChannels = {
  [channelId: string]: {
    [subChannelId: string]: boolean;
  };
};

interface ChannelContextProps {
  channels: Channel[];
  loading: boolean;
  selectedSubChannels: {
    [channelId: string]: { [subChannelId: string]: boolean };
  };
  refreshData: (
    platformId: string,
    property?: 'channel',
    selectedChannels?: string[],
    hideDeactiveSubchannels?: boolean,
    allDefaultChecked?: boolean
  ) => Promise<Channel[] | void>;
  handleSubChannelChange: (channelId: string, subChannelId: string) => void;
  handleSelectAll: (channelId: string, subChannels: SubChannel[]) => void;
  updateSelectedSubChannels: (
    allChannels: Channel[],
    newSelectedSubChannels: string[],
    hideDeactiveSubchannels?: boolean
  ) => void;
}

interface ChannelProviderProps {
  children: React.ReactNode;
}

const initialChannels: Channel[] = [];

const initialSelectedSubChannels: SelectedSubChannels = {};

const initialChannelContextData: ChannelContextProps = {
  channels: initialChannels,
  loading: false,
  selectedSubChannels: initialSelectedSubChannels,
  refreshData: async (
    platformId: string,
    property?: 'channel',
    selectedChannels?: string[],
    hideDeactiveSubchannels?: boolean,
    allDefaultChecked?: boolean
  ) => {},
  handleSubChannelChange: (channelId: string, subChannelId: string) => {},
  handleSelectAll: (channelId: string, subChannels: SubChannel[]) => {},
  updateSelectedSubChannels: (
    allChannels: Channel[],
    newSelectedSubChannels: string[],
    hideDeactiveSubchannels?: boolean
  ) => {},
};

export const ChannelContext = createContext<ChannelContextProps>(
  initialChannelContextData
);

export const ChannelProvider = ({ children }: ChannelProviderProps) => {
  const { retrievePlatformProperties } = useAppStore();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedSubChannels, setSelectedSubChannels] =
    useState<SelectedSubChannels>({});
  const [loading, setLoading] = useState<boolean>(false);

  const refreshData = useCallback(
    async (
      platformId: string,
      property: 'channel' = 'channel',
      selectedChannels?: string[],
      hideDeactiveSubchannels: boolean = false,
      allDefaultChecked: boolean = true
    ) => {
      setLoading(true);
      try {
        const data = await retrievePlatformProperties({ property, platformId });
        setChannels(data);
        if (selectedChannels) {
          updateSelectedSubChannels(
            data,
            selectedChannels,
            hideDeactiveSubchannels
          );
        } else {
          const newSelectedSubChannels = data.reduce(
            (acc: any, channel: any) => {
              acc[channel.channelId] = channel.subChannels.reduce(
                (subAcc: any, subChannel: any) => {
                  if (allDefaultChecked) {
                    subAcc[subChannel.channelId] =
                      subChannel.canReadMessageHistoryAndViewChannel;
                  } else {
                    subAcc[subChannel.channelId] = false;
                  }

                  return subAcc;
                },
                {} as { [subChannelId: string]: boolean }
              );
              return acc;
            },
            {} as SelectedSubChannels
          );
          setSelectedSubChannels(newSelectedSubChannels);
        }
        return data;
      } catch (error) {
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleSubChannelChange = (channelId: string, subChannelId: string) => {
    setSelectedSubChannels((prev) => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        [subChannelId]: !prev[channelId]?.[subChannelId],
      },
    }));
  };

  const handleSelectAll = (channelId: string, subChannels: SubChannel[]) => {
    const allSelected = subChannels.every(
      (subChannel) =>
        !subChannel.canReadMessageHistoryAndViewChannel ||
        selectedSubChannels[channelId]?.[subChannel.channelId]
    );

    const newSubChannelsState = subChannels.reduce(
      (acc, subChannel) => {
        if (subChannel.canReadMessageHistoryAndViewChannel) {
          acc[subChannel.channelId] = !allSelected;
        } else {
          acc[subChannel.channelId] = false;
        }
        return acc;
      },
      {} as { [subChannelId: string]: boolean }
    );

    setSelectedSubChannels((prev) => ({
      ...prev,
      [channelId]: newSubChannelsState,
    }));
  };

  const updateSelectedSubChannels = (
    allChannels: Channel[],
    newSelectedSubChannels: string[],
    hideDeactiveSubchannels: boolean = false
  ) => {
    if (hideDeactiveSubchannels) {
      const filteredChannels = allChannels
        .map((channel) => ({
          ...channel,
          subChannels: channel.subChannels.filter((subChannel) =>
            newSelectedSubChannels.includes(subChannel.channelId)
          ),
        }))
        .filter((channel) => channel.subChannels.length > 0);

      setChannels(filteredChannels);

      setSelectedSubChannels(
        filteredChannels.reduce((acc: any, channel: any) => {
          acc[channel.channelId] = channel.subChannels.reduce(
            (subAcc: any, subChannel: any) => {
              subAcc[subChannel.channelId] = true;
              return subAcc;
            },
            {}
          );
          return acc;
        }, {})
      );
    } else {
      setSelectedSubChannels((prevSelectedSubChannels: SelectedSubChannels) => {
        const updatedSelectedSubChannels: SelectedSubChannels = {
          ...prevSelectedSubChannels,
        };

        allChannels?.forEach((channel) => {
          const channelUpdates: { [subChannelId: string]: boolean } = {};

          channel?.subChannels?.forEach((subChannel) => {
            if (subChannel.canReadMessageHistoryAndViewChannel) {
              channelUpdates[subChannel.channelId] =
                newSelectedSubChannels.includes(subChannel.channelId);
            } else {
              channelUpdates[subChannel.channelId] = false;
            }
          });

          updatedSelectedSubChannels[channel.channelId] = channelUpdates;
        });

        return updatedSelectedSubChannels;
      });
    }
  };

  const value = {
    channels,
    loading,
    selectedSubChannels,
    handleSubChannelChange,
    handleSelectAll,
    refreshData,
    updateSelectedSubChannels,
  };

  return (
    <ChannelContext.Provider value={value}>{children}</ChannelContext.Provider>
  );
};

export const useChannelContext = () => useContext(ChannelContext);
