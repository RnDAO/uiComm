import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import ICharts from '../types/ICharts';

const createHeatmapSlice: StateCreator<ICharts> = (set, get) => ({
  isLoading: false,
  heatmapRecords: [],
  interactions: {},
  activeMembers: {},
  disengagedMembers: {},
  inactiveMembers: {},
  selectedChannelsList: [],
  fetchHeatmapData: async (
    guild_id: string,
    startDate: string,
    endDate: string,
    timeZone: string,
    channelIds: string[]
  ) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.post(
        `/heatmaps/${guild_id}/heatmap-chart`,
        {
          startDate,
          endDate,
          timeZone,
          channelIds: channelIds,
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
  fetchActiveMembers: async (
    guild_id: string,
    startDate: string,
    endDate: string
  ) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.post(
        `/member-activity/${guild_id}/active-members-composition-line-graph`,
        {
          startDate,
          endDate,
        }
      );
      set({ activeMembers: data, isLoading: false });
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
  fetchDisengagedMembers: async (
    guild_id: string,
    startDate: string,
    endDate: string
  ) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.post(
        `/member-activity/${guild_id}/disengaged-members-composition-line-graph`,
        {
          startDate,
          endDate,
        }
      );
      set({ disengagedMembers: data, isLoading: false });
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
  fetchInactiveMembers: async (
    guild_id: string,
    startDate: string,
    endDate: string
  ) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.post(
        `/member-activity/${guild_id}/inactive-members-line-graph `,
        {
          startDate,
          endDate,
        }
      );
      set({ inactiveMembers: data, isLoading: false });
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
  getSelectedChannelsList: async (guild_id: string) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.get(
        `/guilds/${guild_id}/selected-channels`
      );
      set({ selectedChannelsList: data, isLoading: false });
      return data;
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
});

export default createHeatmapSlice;
