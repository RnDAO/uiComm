import { IPlatformProps } from '../../utils/interfaces';

export interface IRetrievePlatformsProps {
  page: number;
  limit: number;
  sortBy?: string;
  name?: string;
  community: string;
}

export interface IRetrivePlatformRolesOrChannels {
  page?: number;
  limit?: number;
  sortBy?: string;
  name?: string;
  platformId: string;
  property: 'channel' | 'role' | 'guildMember';
}

export interface IDeletePlatformProps {
  id: string;
  deleteType: 'hard' | 'soft';
}

export interface IPatchPlatformInput {
  id: string;
  metadata: {
    selectedChannels: string[];
    period: string;
    analyzerStartedAt: string;
  };
}

export interface IGrantWritePermissionsProps {
  platformType: 'discord' | 'telegram';
  moduleType: 'Announcements';
  id: string;
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
  retrievePlatformById: (id: string) => void;
  deletePlatform: ({ id, deleteType }: IDeletePlatformProps) => void;
  patchPlatformById: ({
    id,
    metadata: { selectedChannels, period, analyzerStartedAt },
  }: IPatchPlatformInput) => void;
  retrievePlatformProperties: ({
    platformId,
    property,
    name,
    sortBy,
    page,
    limit,
  }: IRetrivePlatformRolesOrChannels) => void;
  grantWritePermissions: ({
    platformType,
    moduleType,
    id,
  }: IGrantWritePermissionsProps) => void;
}
