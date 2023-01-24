import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import IHeatmap from '../types/IHeatmap';

const createHeatmapSlice: StateCreator<IHeatmap> = (set, get) => ({
  isLoading: false,
  heatmapRecords: [],
  fetchHeatmapData: async (guild_id: string) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.get(`/heatmaps/${guild_id}`);
      set({ heatmapRecords: [...data], isLoading: false });
    } catch (error) {}
  },
});

export default createHeatmapSlice;
