export type IToken = {
  readonly accessExp: string;
  readonly accessToken: string;
  readonly refreshExp: string;
  readonly refreshToken: string;
};

export type IGuild = {
  readonly guildId: string;
  readonly guildName: string;
};

export type IUser = {
  token: IToken;
  guild: IGuild;
};
