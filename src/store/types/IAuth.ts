export type IUser = {
  accessToken: string;
  accessExp: Date;
  guildId: string;
  guildName: string;
  refreshExp: Date;
  refreshToken: string;
  isSuccessful: boolean;
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
  isChecked?: boolean;
};

export default interface IAuth {
  user: IUser | {};
  isLoading: boolean;
  isLoggedIn: boolean;
  guildChannels: IGuildChannels[];
  redirectToDiscord: () => void;
  loginWithDiscord: (user: IUser | {}) => void;
  fetchGuildChannels: (guild_id: string) => void;
  changeEmail: (email: string) => void;
}
