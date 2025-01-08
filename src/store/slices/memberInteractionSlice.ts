import { StateCreator } from 'zustand';

import IMemberInteraction from '../types/IMemberInteraction';
import { axiosInstance } from '../../axiosInstance';

const createHeatmapSlice: StateCreator<IMemberInteraction> = (set, get) => ({
  isLoading: false,
  memberInteractionRecords: [],
  getMemberInteraction: async (
    platformId: string,
    platformType: 'discord' | 'discourse' | 'telegram'
  ) => {
    try {
      const endpoint =
        platformType === 'discourse'
          ? `/discourse/member-activity/${platformId}/members-interactions-network-graph`
          : platformType === 'telegram'
            ? `/telegram/member-activity/${platformId}/members-interactions-network-graph`
            : `/member-activity/${platformId}/members-interactions-network-graph`;
            
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.post(endpoint);
      set({ memberInteractionRecords: [...data], isLoading: false });
      return data;
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
});

export default createHeatmapSlice;
