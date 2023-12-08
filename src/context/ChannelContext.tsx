import React, { createContext, useState, useContext, useCallback } from 'react';
import useAppStore from '../store/useStore';

export interface SubChannel {
  channelId: string;
  name: string;
  parentId: string;
  canReadMessageHistoryAndViewChannel: boolean;
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
    property?: 'channel' | 'role',
    selectedChannels?: string[]
  ) => Promise<Channel[] | void>;
  handleSubChannelChange: (channelId: string, subChannelId: string) => void;
  handleSelectAll: (channelId: string, subChannels: SubChannel[]) => void;
  updateSelectedSubChannels: (
    allChannels: Channel[],
    newSelectedSubChannels: string[]
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
    property?: 'channel' | 'role',
    selectedChannels?: string[]
  ) => {},
  handleSubChannelChange: (channelId: string, subChannelId: string) => {},
  handleSelectAll: (channelId: string, subChannels: SubChannel[]) => {},
  updateSelectedSubChannels: (
    allChannels: Channel[],
    newSelectedSubChannels: string[]
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
      property: 'channel' | 'role' = 'channel',
      selectedChannels?: string[]
    ) => {
      setLoading(true);
      try {
        const data = await retrievePlatformProperties({ property, platformId });
        setChannels(data);
        if (selectedChannels) {
          console.log('dsd');

          updateSelectedSubChannels(data, selectedChannels);
        } else {
          const newSelectedSubChannels = data.reduce(
            (acc: any, channel: any) => {
              acc[channel.channelId] = channel.subChannels.reduce(
                (subAcc: any, subChannel: any) => {
                  subAcc[subChannel.channelId] =
                    subChannel.canReadMessageHistoryAndViewChannel;
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

    const newSubChannelsState = subChannels.reduce((acc, subChannel) => {
      if (subChannel.canReadMessageHistoryAndViewChannel) {
        acc[subChannel.channelId] = !allSelected;
      } else {
        acc[subChannel.channelId] = false;
      }
      return acc;
    }, {} as { [subChannelId: string]: boolean });

    setSelectedSubChannels((prev) => ({
      ...prev,
      [channelId]: newSubChannelsState,
    }));
  };

  const updateSelectedSubChannels = (
    allChannels: Channel[],
    newSelectedSubChannels: string[]
  ) => {
    setSelectedSubChannels((prevSelectedSubChannels: SelectedSubChannels) => {
      const updatedSelectedSubChannels: SelectedSubChannels = {
        ...prevSelectedSubChannels,
      };

      allChannels.forEach((channel) => {
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
      console.log({ updatedSelectedSubChannels });

      return updatedSelectedSubChannels;
    });
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
