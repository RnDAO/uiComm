import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import ITwitter from '../types/ITwitter';
import { conf } from '../../configs';

const BASE_URL = conf.API_BASE_URL;

const createTwitterSlice: StateCreator<ITwitter> = (set, get) => ({
  authorizeTwitter: async (token: string) => {
    try {
      // Send token to intermediary endpoint
      await axiosInstance({
        method: 'GET', // adjust as necessary
        url: `${BASE_URL}/auth/twitter/login`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // The above request should set some session or cookie authentication
      // and then redirect to the Twitter authorization URL.
      // Since it's a 302 redirect, you might not need to handle the response directly.
    } catch (error) {
      console.error('Error in intermediary auth step:', error);
    }
  },
});

export default createTwitterSlice;
