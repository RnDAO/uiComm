import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import ITwitter from '../types/ITwitter';

const createTwitterSlice: StateCreator<ITwitter> = (set, get) => ({
  authorizeTwitter: async (token: string) => {
    try {
      await axiosInstance.get(`/auth/twitter/login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error in intermediary auth step:', error);
    }
  },
  disconnectTwitter: async () => {
    try {
      await axiosInstance.post(`/twitter/disconnct`);
    } catch (error) {}
  },
  refreshTwitterMetrics: async (username) => {
    try {
      await axiosInstance.post(`/twitter/metrics/refresh`, {
        twitter_username: username,
      });
    } catch (error) {}
  },
  twitterActivityAccount: (twitterId) => {
    try {
      axiosInstance.get(`/twitter/${twitterId}/metrics/activity`);
    } catch (error) {}
  },
  twitterAudienceAccount: (twitterId) => {
    try {
      axiosInstance.get(`/twitter/${twitterId}/metrics/audience`);
    } catch (error) {}
  },
  twitterEngagementAccount: (twitterId) => {
    try {
      axiosInstance.get(`/twitter/${twitterId}/metrics/engagement`);
    } catch (error) {}
  },
});

export default createTwitterSlice;
