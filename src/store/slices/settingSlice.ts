import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import ISetting from '../types/ISetting';

const createSettingSlice: StateCreator<ISetting> = (set, get) => ({
  isLoading: false,
  guildsInfo: [],
  getUserGuildsInformation: async () => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.get(
        `/users/@me/guilds-with-admin-role`
      );

      set({ guildsInfo: data, isLoading: false });
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
});

export default createSettingSlice;
