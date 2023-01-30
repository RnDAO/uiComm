export default interface IGuildInfo {
  id?: string;
  guildId?: string;
  ownerId?: string;
  name?: boolean;
  period?: string;
  selectedChannels?: { channelId: string; channelName: string }[];
}
export default interface ISetting {
  isLoading: boolean;
  guildInfo?: IGuildInfo | {};
  userInfo: {};
  getUserGuildInfo: (guildId: string) => void;
  getUserInfo: () => void;
  updateSelectedChannels: (
    guildId: string,
    selectedChannels: { channelId: string; channelName: string }[]
  ) => void;
}
