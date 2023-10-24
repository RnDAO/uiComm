import { StateCreator } from 'zustand';

import { axiosInstance } from '../../axiosInstance';
import IPlatfrom, { IRetrievePlatformsProps } from '../types/IPlatform';
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
  }: IRetrievePlatformsProps) => {
    try {
      const params = {
        page,
        limit,
        sortBy,
        ...(name ? { name } : {}),
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
});

export default createPlatfromSlice;
