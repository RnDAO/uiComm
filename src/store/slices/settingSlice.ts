import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import ISetting from '../types/ISetting';

const createSettingSlice: StateCreator<ISetting> = (set, get) => ({
  isLoading: false,
  guildInfo: [],
  getUserGuildInfo: async (guildId: string) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.get(`/guilds/${guildId}`);

      set({ guildInfo: data, isLoading: false });
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
  updateSelectedChannels: async (guildId, selectedChannels) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.patch(`/guilds/${guildId}`, {
        selectedChannels: selectedChannels,
      });
      set({ isLoading: false });
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
});

export default createSettingSlice;
