import { StateCreator } from 'zustand';

import { IReputationScore } from '../types/IReputationScore';
import { axiosInstance } from '../../axiosInstance';

const createReputationScoreSlice: StateCreator<IReputationScore> = (set) => ({
  reputationScore: null,

  retrieveReputationScore: async ({ address, tokenId }) => {
    try {
      const { data } = await axiosInstance.get<number>(
        `nft/${tokenId}/${address}/reputation-score`
      );
      set({ reputationScore: data });
      return data;
    } catch (error) {
      return null;
    }
  },
});

export default createReputationScoreSlice;
