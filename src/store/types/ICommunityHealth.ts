export default interface ICommunityHealth {
  isLoading: boolean;
  getFragmentation: (guild_id: string) => any;
  getDecentralisation: (guild_id: string) => any;
}
