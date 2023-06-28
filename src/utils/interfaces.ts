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
  id: string;
  color: number | string;
  name: string;
}
