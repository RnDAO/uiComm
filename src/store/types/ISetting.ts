export type IGuildInfo = {
  id?: string;
  guildId?: string;
  ownerId?: string;
  name?: boolean;
  period?: string;
  selectedChannels?: { channelId: string; channelName: string }[];
};

export type DISCONNECT_TYPE = 'soft' | 'hard';

export default interface IGuildList extends IGuildInfo {
  isInProgress?: boolean;
  isDisconnected?: boolean;
  connectedAt?: string;
}
export default interface ISetting {
  isLoading: boolean;
  guildInfo?: IGuildInfo | {};
  userInfo: {};
  guildInfoByDiscord: {};
  guilds: IGuildList[];
  getUserGuildInfo: (guildId: string) => void;
  getUserInfo: () => any;
  getGuildInfoByDiscord: (guildId: string) => void;
  updateSelectedChannels: (
    guildId: string,
    selectedChannels: { channelId: string; channelName: string }[]
  ) => void;
  patchGuildById: (
    guildId: string,
    period: string,
    selectedChannels: { channelId: string; channelName: string }[]
  ) => any;
  updateAnalysisDatePeriod: (guildId: string, period: string) => void;
  getGuilds: () => void;
  disconnecGuildById: (
    guildId: string,
    disconnectType: DISCONNECT_TYPE
  ) => void;
}
