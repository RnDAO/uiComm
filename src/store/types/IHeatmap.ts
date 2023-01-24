export default interface IHeatmap {
  isLoading: boolean;
  heatmapRecords: any[];
  fetchHeatmapData: (
    guild_id: string,
    startDate: string,
    endDate: string,
    timeZone: string
  ) => any;
}
