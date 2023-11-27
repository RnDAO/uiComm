export interface IRetrieveCommunitiesProps {
  page: number;
  limit: number;
  sortBy?: string;
  name?: string;
}
export interface ICreateCommunitieProps {
  name: string;
  avatarURL?: string;
  tcaAt: string;
}

export interface IPatchCommunityProps {
  communityId: string;
  name?: string;
  avatarURL?: string;
  tcaAt?: string;
}

export default interface ICentric {
  discordAuthorization: () => void;
  retrieveCommunities: ({
    page,
    limit,
    sortBy,
    name,
  }: IRetrieveCommunitiesProps) => void;
  createNewCommunitie: ({
    name,
    avatarURL,
    tcaAt,
  }: ICreateCommunitieProps) => void;
  retrieveCommunityById: (communityId: string) => void;
  deleteCommunityById: (communityId: string) => void;
  patchCommunityById: ({
    communityId,
    name,
    avatarURL,
    tcaAt,
  }: IPatchCommunityProps) => void;
}
