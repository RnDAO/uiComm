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
  decentralisationScoreDate: number;
  decentralisationScoreRange: {
    minimumDecentralisationScore: number;
    maximumDecentralisationScore: number;
  };
  scoreStatus: number;
}

export interface IFragmentationScoreResponse {
  fragmentationScore: number;
  fragmentationScoreDate: number;
  scoreStatus: number;
  fragmentationScoreRange: {
    minimumFragmentationScore: number;
    maximumFragmentationScore: number;
  };
}
