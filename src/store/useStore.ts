import { create } from 'zustand';
import createAuthSlice from './slices/authSlice';
import createChartSlice from './slices/chartSlice';
import createSettingSlice from './slices/settingSlice';
import createMemberInteractionSlice from './slices/memberInteractionSlice';
const useAppStore = create<any>()((...a) => ({
  ...createAuthSlice(...a),
  ...createChartSlice(...a),
  ...createSettingSlice(...a),
  ...createMemberInteractionSlice(...a),
}));

export default useAppStore;
