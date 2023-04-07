export default interface IHeatmap {
  isLoading: boolean;
  heatmapRecords: any[];
  interactions: {};
  activeMembers: {};
  fetchHeatmapData: (
    guild_id: string,
    startDate: string,
    endDate: string,
    timeZone: string
  ) => any;
  fetchInteractions: (
    guild_id: string,
    startDate: string,
    endDate: string,
    timeZone: string
  ) => any;
  fetchActiveMembers: (
    guild_id: string,
    startDate: string,
    endDate: string,
    timeZone: string
  ) => any;
}
