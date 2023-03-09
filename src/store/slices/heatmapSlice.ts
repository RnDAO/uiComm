import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import IHeatmap from '../types/IHeatmap';

const createHeatmapSlice: StateCreator<IHeatmap> = (set, get) => ({
  isLoading: false,
  heatmapRecords: [],
  interactions: {},
  fetchHeatmapData: async (
    guild_id: string,
    startDate: string,
    endDate: string,
    timeZone: string
  ) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.post(
        `/heatmaps/${guild_id}/heatmap-chart`,
        {
          startDate,
          endDate,
          timeZone,
        }
      );
      set({ heatmapRecords: [...data], isLoading: false });
      return data;
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
  fetchInteractions: async (
    guild_id: string,
    startDate: string,
    endDate: string
  ) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.post(
        `/heatmaps/${guild_id}/line-graph`,
        {
          startDate,
          endDate,
        }
      );
      set({ interactions: data, isLoading: false });
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
});

export default createHeatmapSlice;
