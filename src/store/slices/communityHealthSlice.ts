import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import ICommunityHealth from '../types/ICommunityHealth';

const createCommunityHealthSlice: StateCreator<ICommunityHealth> = (
  set,
  get
) => ({
  isLoading: false,
  fragmentation: [],
  getFragmentation: async (guild_id: string) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.post(
        `/member-activity/${guild_id}/fragmentation-score`
      );
      set({ fragmentation: [...data], isLoading: false });
      return data;
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
});

export default createCommunityHealthSlice;
