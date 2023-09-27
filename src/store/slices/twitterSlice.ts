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
      // Handle the error more gracefully, e.g., show a message to the user, etc.
    }
  },
  disconnectTwitter: async () => {
    try {
      await axiosInstance.post(`twitter/disconnect`);
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
