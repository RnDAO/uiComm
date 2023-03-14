export type IUser = {
  readonly accessToken: string;
  readonly accessExp: string;
  readonly guildId: string;
  readonly guildName: string;
  readonly refreshExp: string;
  readonly refreshToken: string;
};

export type IGuildChannels = {
  id: string;
  title: string;
  subChannels: ISubChannels[];
};

export type ISubChannels = {
  readonly flags: number;
  readonly guild_id: string;
  readonly id: string;
  readonly last_message_id: string;
  readonly name: string;
  readonly nsfw: string;
  readonly parent_id: string;
  readonly permission_overwrites?: [];
  readonly position: number;
  readonly rate_limit_per_user: number;
  readonly topic: string | null;
  readonly type: number;
};

export default interface IAuth {
  user: IUser | {};
  isLoading: boolean;
  isLoggedIn: boolean;
  guildChannels: IGuildChannels[];
  signUp: () => void;
  login: () => void;
  loginWithDiscord: (user: IUser) => void;
  fetchGuildChannels: (guild_id: string) => void;
  updateGuildById: (
    guildId: string,
    period: string,
    selectedChannels: { channelId: string; channelName: string }[]
  ) => any;
  changeEmail: (email: string) => any;
}
