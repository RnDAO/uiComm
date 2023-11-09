import { IPlatformProps } from '../../utils/interfaces';

export interface IRetrievePlatformsProps {
  page: number;
  limit: number;
  sortBy?: string;
  name?: string;
  community: string;
}

export default interface IPlatfrom {
  connectedPlatforms: any[];
  connectNewPlatform: (platfromType: string) => void;
  retrievePlatforms: ({
    page,
    limit,
    sortBy,
    name,
    community,
  }: IRetrievePlatformsProps) => void;
  createNewPlatform: ({ name, community, metadata }: IPlatformProps) => void;
}
