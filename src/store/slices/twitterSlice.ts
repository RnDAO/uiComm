import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import ITwitter from '../types/ITwitter';
import { conf } from '../../configs';

const BASE_URL = conf.API_BASE_URL;

const createTwitterSlice: StateCreator<ITwitter> = (set, get) => ({
  authorizeTwitter: async (discordId: string) => {
    try {
      location.replace(`${BASE_URL}/auth/twitter/login/user/${discordId}`);
    } catch (error) {
      console.error('Error in intermediary auth step:', error);
    }
  },
  disconnectTwitter: async () => {
    try {
      await axiosInstance.post(`twitter/disconnect`);
    } catch (error) {}
  },
  refreshTwitterMetrics: async () => {
    try {
      await axiosInstance.post(`/twitter/metrics/refresh`);
    } catch (error) {}
  },
  twitterActivityAccount: async () => {
    try {
      const { data } = await axiosInstance.get(`/twitter/metrics/activity`);
      return data;
    } catch (error) {}
  },
  twitterAudienceAccount: async () => {
    try {
      const { data } = await axiosInstance.get(`/twitter/metrics/audience`);
      return data;
    } catch (error) {}
  },
  twitterEngagementAccount: async () => {
    try {
      const { data } = await axiosInstance.get(`/twitter/metrics/engagement`);
      return data;
    } catch (error) {}
  },
  twitterAccount: async () => {
    try {
      const { data } = await axiosInstance.get(`/twitter/metrics/account`);
      return data;
    } catch (error) {}
  },
});

export default createTwitterSlice;
