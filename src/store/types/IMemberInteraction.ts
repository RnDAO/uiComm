export default interface IMemberInteraction {
  isLoading: boolean;
  memberInteractionRecords: any[];
  getMemberInteraction: (platformId: string) => any;
}
