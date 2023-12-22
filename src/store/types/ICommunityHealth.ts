export default interface ICommunityHealth {
  isLoading: boolean;
  getFragmentation: (platformId: string) => any;
  getDecentralisation: (platformId: string) => any;
}
