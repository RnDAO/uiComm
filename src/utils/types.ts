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
