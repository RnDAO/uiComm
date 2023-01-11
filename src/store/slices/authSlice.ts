import { StateCreator } from 'zustand';
import IAuth from '../types/IAuth';
import { conf } from '../../configs';
import {axiosInstance} from '../../axiosInstance';

const BASE_URL = conf.API_BASE_URL;

const createAuthSlice: StateCreator<IAuth> = (set, get) => ({
  isLoggedIn: false,
  user: {},
  guildChannels: [],
  redirectToDiscord: () => {
    location.replace(`${BASE_URL}/auth/login`);
  },
  loginWithDiscord: (user: any) =>
    set(() => {
      localStorage.setItem('user', JSON.stringify(user));
      return { user };
    }),
  fetchGuildChannels: async (guild_id) => {
    const { data } = await axiosInstance.get(`/guilds/${guild_id}/channels`);
    console.log('data',data);
    set({ guildChannels: [...data] });
  },
});

export default createAuthSlice;
