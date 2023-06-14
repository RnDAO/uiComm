import { IChannelWithoutId, IGuildChannels } from '../../utils/types';

export type IGuildInfo = {
  id?: string;
  guildId?: string;
  ownerId?: string;
  name?: boolean;
  period?: string;
  selectedChannels?: IChannelWithoutId[];
};

export type DISCONNECT_TYPE = 'soft' | 'hard';

export default interface IGuildList extends IGuildInfo {
  isInProgress?: boolean;
  isDisconnected?: boolean;
  connectedAt?: string;
}
export default interface ISetting {
  isLoading: boolean;
  isRefetchLoading: boolean;
  guildInfo?: IGuildInfo | {};
  userInfo: {};
  guildInfoByDiscord: {};
  guilds: IGuildList[];
  guildChannels: IGuildChannels[];
  getUserGuildInfo: (guildId: string) => void;
  getUserInfo: () => any;
  getGuildInfoByDiscord: (guildId: string) => void;
  updateSelectedChannels: (
    guildId: string,
    selectedChannels: IChannelWithoutId[]
  ) => void;
  patchGuildById: (
    guildId: string,
    period: string,
    selectedChannels: IChannelWithoutId[]
  ) => any;
  updateAnalysisDatePeriod: (guildId: string, period: string) => void;
  getGuilds: () => void;
  disconnecGuildById: (
    guildId: string,
    disconnectType: DISCONNECT_TYPE
  ) => void;
  refetchGuildChannels: (guild_id: string) => void;
}
