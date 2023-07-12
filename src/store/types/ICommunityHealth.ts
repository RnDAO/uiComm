export default interface ICommunityHealth {
  isLoading: boolean;
  fragmentation: any[];
  getFragmentation: (guild_id: string) => any;
}
