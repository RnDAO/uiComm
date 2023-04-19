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

export interface callbackUrlParams extends IGuild, IToken {
  statusCode: number | string;
}

export type IUser = {
  token: IToken;
  guild: IGuild;
};

export type IUserHandler = {
  avatar: string;
  name: string;
  isOwner: boolean;
};

export type IDiscordRole = {
  title: string;
  level: string;
}