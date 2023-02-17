import { StateCreator } from 'zustand';
import IAuth, { IUser } from '../types/IAuth';
import { conf } from '../../configs';
import { axiosInstance } from '../../axiosInstance';
import { StorageService } from '../../services/StorageService';

const BASE_URL = conf.API_BASE_URL;

const createAuthSlice: StateCreator<IAuth> = (set, get) => ({
  isLoggedIn: false,
  isLoading: false,
  user: {},
  guildChannels: [],

  signUp: () => {
    location.replace(`${BASE_URL}/auth/try-now`);
  },

  loginWithDiscord: (user: IUser) =>
    set(() => {
      StorageService.writeLocalStorage('user', {
        guild: {
          guildId: user.guildId,
          guildName: user.guildName,
        },
        token: {
          accessToken: user.accessToken,
          accessExp: user.accessExp,
          refreshToken: user.refreshToken,
          refreshExp: user.refreshExp,
        },
      });

      return { user };
    }),

  fetchGuildChannels: async (guild_id: string) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.get(`/guilds/${guild_id}/channels`);
      set({ guildChannels: [...data], isLoading: false });
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },

  updateGuildById: async (guildId, period, selectedChannels) => {
    try {
      set(() => ({ isLoading: true }));
      await axiosInstance.patch(`/guilds/${guildId}`, {
        period,
        selectedChannels: selectedChannels,
      });
      set({ isLoading: false });
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },

  changeEmail: async (emailAddress: string) => {
    try {
      await axiosInstance.patch(`/users/@me`, {
        email: emailAddress,
      });
    } catch (error) {}
  },
});

export default createAuthSlice;
