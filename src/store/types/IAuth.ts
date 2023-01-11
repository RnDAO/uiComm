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
  guild_id: string;
  type: number;
  name: string;
  position: number;
  flags: number;
  parent_id: string;
  Permission_overwrites?: [];
};

export default interface IAuth {
  user: IUser | {};
  isLoggedIn: boolean;
  guildChannels: IGuildChannels[];
  redirectToDiscord: () => void;
  loginWithDiscord: (user: IUser | {}) => void;
  fetchGuildChannels:(guild_id:string) => void
}
