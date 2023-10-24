import { IPlatformProps } from '../../utils/interfaces';

export interface IRetrievePlatformsProps {
  page: number;
  limit: number;
  sortBy?: string;
  name?: string;
}

export default interface IPlatfrom {
  connectedPlatforms: any[];
  connectNewPlatform: (platfromType: string) => void;
  retrievePlatforms: ({
    page,
    limit,
    sortBy,
    name,
  }: IRetrievePlatformsProps) => void;
  createNewPlatform: ({ name, community, metadata }: IPlatformProps) => void;
}
