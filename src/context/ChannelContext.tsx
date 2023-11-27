import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import useAppStore from '../store/useStore';
import { useRouter } from 'next/router';

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
  refreshData: () => Promise<void>;
  handleSubChannelChange: (channelId: string, subChannelId: string) => void;
  handleSelectAll: (channelId: string, subChannels: SubChannel[]) => void;
}

interface ChannelProviderProps {
  children: React.ReactNode;
}

// Initial data for SubChannel
const initialSubChannel: SubChannel = {
  channelId: '',
  name: '',
  parentId: '',
  canReadMessageHistoryAndViewChannel: false,
};

// Initial data for Channel
const initialChannel: Channel = {
  channelId: '',
  title: '',
  subChannels: [initialSubChannel], // Array containing initial SubChannel
};

// Initial data for SelectedSubChannels
const initialSelectedSubChannels: SelectedSubChannels = {};

// Initial data for ChannelContextProps
const initialChannelContextData: ChannelContextProps = {
  channels: [initialChannel], // Array containing initial Channel
  loading: false,
  selectedSubChannels: initialSelectedSubChannels,
  refreshData: async () => {}, // Empty async function
  handleSubChannelChange: (channelId: string, subChannelId: string) => {},
  handleSelectAll: (channelId: string, subChannels: SubChannel[]) => {},
};

export const ChannelContext = createContext<ChannelContextProps>(
  initialChannelContextData
);

export const ChannelProvider = ({ children }: ChannelProviderProps) => {
  const router = useRouter();
  const { retrievePlatformProperties } = useAppStore();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedSubChannels, setSelectedSubChannels] = useState<{
    [channelId: string]: { [subChannelId: string]: boolean };
  }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const platformIdRef = useRef<string>('');
  const propertyRef = useRef<string>('');

  const refreshData = useCallback(async () => {
    setLoading(true);
    const data: Channel[] = await retrievePlatformProperties({
      property: propertyRef.current,
      platformId: platformIdRef.current,
    });

    const newSelectedSubChannels = data.reduce((acc, channel) => {
      acc[channel.channelId] = channel.subChannels.reduce(
        (subAcc, subChannel) => {
          subAcc[subChannel.channelId] = true;
          return subAcc;
        },
        {} as { [subChannelId: string]: boolean }
      );
      return acc;
    }, {} as SelectedSubChannels);

    setChannels(data);
    setSelectedSubChannels(newSelectedSubChannels);
    setLoading(false);
  }, [retrievePlatformProperties]);

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
      (subChannel) => selectedSubChannels[channelId]?.[subChannel.channelId]
    );
    const newSubChannelsState = subChannels.reduce((acc, subChannel) => {
      acc[subChannel.channelId] = !allSelected;
      return acc;
    }, {} as { [subChannelId: string]: boolean });

    setSelectedSubChannels((prev) => ({
      ...prev,
      [channelId]: newSubChannelsState,
    }));
  };

  useEffect(() => {
    const { platformId, property } = router.query;
    if (platformId && property) {
      // Handle conversion to string if necessary
      const platformIdString = Array.isArray(platformId)
        ? platformId[0]
        : platformId;
      const propertyString = Array.isArray(property) ? property[0] : property;

      // Set the ref values
      platformIdRef.current = platformIdString;
      propertyRef.current = propertyString;
      refreshData();
    }
  }, [router.query]);

  const value = {
    channels,
    loading,
    selectedSubChannels,
    refreshData,
    handleSubChannelChange,
    handleSelectAll,
  };

  return (
    <ChannelContext.Provider value={value}>{children}</ChannelContext.Provider>
  );
};

export const useChannelContext = () => useContext(ChannelContext);
