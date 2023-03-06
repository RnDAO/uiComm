export default interface IHeatmap {
  isLoading: boolean;
  heatmapRecords: any[];
  interactions: {};
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
}
