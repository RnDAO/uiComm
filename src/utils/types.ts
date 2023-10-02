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

export interface ITwitter {
  twitterConnectedAt: string;
  twitterId: string;
  twitterProfileImageUrl: string;
  twitterUsername: string;
  lastUpdatedMetrics: string;
}

export type IUser = {
  token: IToken;
  guild: IGuild;
  twitter?: ITwitter;
};

export type IGuildChannels = {
  channelId: string;
  title: string;
  selected?: { [key: string]: boolean };
  subChannels: ISubChannels[];
};

export type ISubChannels = {
  readonly id?: string;
  readonly channelId: string;
  readonly name: string;
  readonly canReadMessageHistoryAndViewChannel: boolean;
  readonly parent_id: string;
};

export type IChannel = {
  channelId: string;
  channelName: string;
  _id: string;
};

export type IChannelWithoutId = Omit<IChannel, '_id'>;
