export interface StatisticsProps {
  label: string;
  percentageChange: number;
  description?: string;
  value: number;
  colorBadge: string;
  hasTooltip: boolean;
  tooltipText?: React.ReactNode;
  customBackground?: boolean;
}

export interface SeriesData {
  name: string;
  data: number[];
}

export interface Column {
  id: string;
  label: string;
}

export interface Row {
  [key: string]: any;
}

export interface IRoles {
  roleId: string;
  color: number | string;
  name: string;
}

export interface IUserProfile {
  avatar: string;
  id: string;
  joinedAt: string;
  discordId: string;
  ngu: string;
  radius: number;
  roles: IRoles[];
  stats: string;
  username: string;
}

export interface IActivityCompositionOptions {
  name: string;
  value: string;
  color: string;
}

export interface IRowDetail {
  discordId: string;
  avatar: string;
  username: string;
  roles: IRoles[];
  activityComposition: string[];
}

export interface IDecentralisationScoreResponse {
  decentralisationScore: number;
  decentralisationScoreRange: {
    minimumDecentralisationScore: number;
    maximumDecentralisationScore: number;
  };
  scoreStatus: number;
}

export interface IFragmentationScoreResponse {
  fragmentationScore: number;
  scoreStatus: number;
  fragmentationScoreRange: {
    minimumFragmentationScore: number;
    maximumFragmentationScore: number;
  };
}

export interface IDecodedToken {
  exp: number;
  iat: number;
  sub: string;
  type: string;
}

export interface ITrackEventParams {
  eventType: string;
  eventProperties?: Record<string, any>;
  callback?: (result: { event: any; code: any; message: any }) => void;
}

export interface IActivity {
  posts: number;
  replies: number;
  retweets: number;
  likes: number;
  mentions: number;
}

export interface IAudience {
  replies: number;
  retweets: number;
  likes: number;
  mentions: number;
}

export interface IEngagement {
  hqla: number;
  hqhe: number;
  lqla: number;
  lqhe: number;
}

export interface IAccount {
  follower: number;
  engagement: number;
}

export interface IDataTwitter {
  activity: IActivity;
  audience: IAudience;
  engagement: IEngagement;
  account: IAccount;
}

export interface ICommunity {
  id: string;
  name: string;
  platforms: string[];
  users: string[];
  avatarURL: string;
}

export interface FetchedData {
  limit: number;
  page: number;
  results: any[];
  totalPages: number;
  totalResults: number;
}

export interface IPlatformProps {
  name: string;
  community: string;
  isInProgress: boolean;
  connectedAt: string;
  id: string;
  disconnectedAt: string | null;
  metadata: metaData;
}

export interface metaData {
  [key: string]: any;
}
