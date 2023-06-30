import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import IMemberInteraction from '../types/IMemberInteraction';

const createHeatmapSlice: StateCreator<IMemberInteraction> = (set, get) => ({
  isLoading: false,
  memberInteractionRecords: [],
  getMemberInteraction: async (guild_id: string) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.get(
        `/member-activity/${guild_id}/members-interactions-network-graph`
      );
      set({ memberInteractionRecords: [...data], isLoading: false });
      return data;
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
});

export default createHeatmapSlice;
