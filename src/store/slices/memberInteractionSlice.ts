import { StateCreator } from 'zustand';

import IMemberInteraction from '../types/IMemberInteraction';
import { axiosInstance } from '../../axiosInstance';

const createHeatmapSlice: StateCreator<IMemberInteraction> = (set, get) => ({
  isLoading: false,
  memberInteractionRecords: [],
  getMemberInteraction: async (platformId: string) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.post(
        `/member-activity/${platformId}/members-interactions-network-graph`
      );
      set({ memberInteractionRecords: [...data], isLoading: false });
      return data;
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
});

export default createHeatmapSlice;
