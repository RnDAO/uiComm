export default interface IHeatmap {
  isLoading: boolean;
  heatmapRecords: any[];
  fetchHeatmapData: (guild_id: string) => void;
}
