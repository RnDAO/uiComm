export default interface IGuildInfo {
  id?: string;
  name?: string;
  icon?: string;
  owner?: boolean;
  permissions?: string;
  features?: string[];
}
export default interface ISetting {
  isLoading: boolean;
  guildsInfo?: IGuildInfo[] | [];
  getUserGuildsInformation: () => void;
}
