import { create } from 'zustand';

import announcementsSlice from './slices/announcementsSlice';
import createBreakdownsSlice from './slices/breakdownsSlice';
import centricSlice from './slices/centricSlice';
import createChartSlice from './slices/chartSlice';
import communityHealthSlice from './slices/communityHealthSlice';
import createMemberInteractionSlice from './slices/memberInteractionSlice';
import moduleSlice from './slices/moduleSlice';
import platformSlice from './slices/platformSlice';
import reputationScoreSlice from './slices/reputationScore';
import twitterSlice from './slices/twitterSlice';
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
  ...announcementsSlice(...a),
  ...moduleSlice(...a),
  ...reputationScoreSlice(...a),
}));

export default useAppStore;
