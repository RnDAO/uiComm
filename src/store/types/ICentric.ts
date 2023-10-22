export interface IRetrieveCommunitiesProps {
  page: number;
  limit: number;
  sortBy?: string;
  name?: string;
}

export default interface ICentric {
  discordAuthorization: () => void;
  retrieveCommunities: ({
    page,
    limit,
    sortBy,
    name,
  }: IRetrieveCommunitiesProps) => void;
}
