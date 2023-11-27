import { StateCreator } from 'zustand';

import { axiosInstance } from '../../axiosInstance';
import IPlatfrom, {
  IRetrievePlatformsProps,
  IRetrivePlatformRolesOrChannels,
  IPatchPlatformInput,
} from '../types/IPlatform';
import { conf } from '../../configs';
import { IPlatformProps } from '../../utils/interfaces';

const BASE_URL = conf.API_BASE_URL;

const createPlatfromSlice: StateCreator<IPlatfrom> = (set, get) => ({
  connectedPlatforms: [],
  connectNewPlatform: (platfromType) => {
    try {
      location.replace(`${BASE_URL}/platforms/connect/${platfromType}`);
    } catch (error) {}
  },
  retrievePlatforms: async ({
    page,
    limit,
    sortBy,
    name,
    community,
  }: IRetrievePlatformsProps) => {
    try {
      const params = {
        page,
        limit,
        sortBy,
        ...(name ? { name } : {}),
        ...(community ? { community } : {}),
      };

      const { data } = await axiosInstance.get(`/platforms/`, { params });
      set({ connectedPlatforms: [...data.results] });
      return data;
    } catch (error) {
      console.error('Failed to retrieve communities:', error);
    }
  },
  createNewPlatform: async ({ name, community, metadata }: IPlatformProps) => {
    try {
      const { data } = await axiosInstance.post('/platforms', {
        name,
        community,
        metadata,
      });
      return data;
    } catch (error) {}
  },
  retrievePlatformById: async (id: string) => {
    try {
      const { data } = await axiosInstance.get(`/platforms/${id}`);
      return data;
    } catch (error) {}
  },
  deletePlatform: async ({ id, deleteType }) => {
    try {
      const { data } = await axiosInstance.delete(`/platforms/${id}`, {
        data: {
          deleteType,
        },
      });
      return data;
    } catch (error) {}
  },
  retrievePlatformProperties: async ({
    platformId,
    property = 'channel',
    name,
    sortBy,
    page,
    limit,
  }: IRetrivePlatformRolesOrChannels) => {
    try {
      const params = new URLSearchParams();

      params.append('property', property);

      // Only append sortBy if it's not undefined
      if (sortBy !== undefined) {
        params.append('sortBy', sortBy);
      }

      if (name) params.append('name', name);

      if (page !== undefined) {
        params.append('page', page.toString());
      }
      if (limit !== undefined) {
        params.append('limit', limit.toString());
      }

      const url = `/platforms/${platformId}/properties?${params.toString()}`;
      const { data } = await axiosInstance.post(url);
      return data;
    } catch (error) {}
  },
  patchPlatformById: async ({ id, metadata }: IPatchPlatformInput) => {
    try {
      const { data } = await axiosInstance.patch(`/platforms/${id}`, {
        metadata,
      });
      return data;
    } catch (error) {}
  },
});

export default createPlatfromSlice;
