import { create } from 'zustand';
import createChartSlice from './slices/chartSlice';
import createBreakdownsSlice from './slices/breakdownsSlice';
import createMemberInteractionSlice from './slices/memberInteractionSlice';
import communityHealthSlice from './slices/communityHealthSlice';
import twitterSlice from './slices/twitterSlice';
import centricSlice from './slices/centricSlice';
import platformSlice from './slices/platformSlice';
import userSlice from './slices/userSlice';

const useAppStore = create<any>()((...a) => ({
  ...createChartSlice(...a),
  ...createBreakdownsSlice(...a),
  ...createMemberInteractionSlice(...a),
  ...communityHealthSlice(...a),
  ...twitterSlice(...a),
  ...centricSlice(...a),
  ...platformSlice(...a),
  ...userSlice(...a),
}));

export default useAppStore;
