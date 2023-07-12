export default interface IMemberInteraction {
  isLoading: boolean;
  memberInteractionRecords: any[];
  getMemberInteraction: (guild_id: string) => any;
}
