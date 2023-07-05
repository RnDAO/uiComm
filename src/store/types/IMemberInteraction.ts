export default interface IHeatmap {
  isLoading: boolean;
  memberInteractionRecords: any[];
  getMemberInteraction: (guild_id: string) => any;
}
