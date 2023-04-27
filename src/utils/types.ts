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

export type IGuildChannels = {
  id: string;
  title: string;
  selected?: { [key: string]: boolean };
  subChannels: ISubChannels[];
};

export type ISubChannels = {
  readonly id: string;
  readonly name: string;
  readonly canReadMessageHistoryAndViewChannel: boolean;
  readonly parent_id: string;
};
