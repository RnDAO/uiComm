import { StateCreator } from 'zustand';

import ICommunityHealth from '../types/ICommunityHealth';
import { axiosInstance } from '../../axiosInstance';

const createCommunityHealthSlice: StateCreator<ICommunityHealth> = (
  set,
  get
) => ({
  isLoading: false,
  getFragmentation: async (platformId: string) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.get(
        `/member-activity/${platformId}/fragmentation-score`
      );
      set({ isLoading: false });
      return data;
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
  getDecentralisation: async (platformId: string) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.get(
        `/member-activity/${platformId}/decentralisation-score`
      );
      set({ isLoading: false });
      return data;
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
});

export default createCommunityHealthSlice;
