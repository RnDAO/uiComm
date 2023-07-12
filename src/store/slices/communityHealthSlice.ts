import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import ICommunityHealth from '../types/ICommunityHealth';

const createCommunityHealthSlice: StateCreator<ICommunityHealth> = (
  set,
  get
) => ({
  isLoading: false,
  getFragmentation: async (guild_id: string) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.get(
        `/member-activity/${guild_id}/fragmentation-score`
      );
      return data;
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
  getDecentralisation: async (guild_id: string) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.get(
        `/member-activity/${guild_id}/decentralisation-score`
      );
      return data;
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
});

export default createCommunityHealthSlice;
