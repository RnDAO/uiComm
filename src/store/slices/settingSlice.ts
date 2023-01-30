import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import ISetting from '../types/ISetting';

const createSettingSlice: StateCreator<ISetting> = (set, get) => ({
  isLoading: false,
  guildInfo: {},
  userInfo: {},
  guildInfoByDiscord: {},
  getUserGuildInfo: async (guildId: string) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.get(`/guilds/${guildId}`);

      set({ guildInfo: data, isLoading: false });
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
  getUserInfo: async () => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.get('/users/@me');
      set({ userInfo: data, isLoading: false });
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
  getGuildInfoByDiscord: async (guildId) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.get(
        `/guilds/discord-api/${guildId}`
      );      
      set({ guildInfoByDiscord: data, isLoading: false });
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
