import { IGuildChannels } from '../../utils/types';

export type IUser = {
  readonly accessToken: string;
  readonly accessExp: string;
  readonly guildId: string;
  readonly guildName: string;
  readonly refreshExp: string;
  readonly refreshToken: string;
};

export type ISubChannels = {
  readonly id: string;
  readonly name: string;
  readonly canReadMessageHistoryAndViewChannel: boolean;
  readonly parent_id: string;
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
