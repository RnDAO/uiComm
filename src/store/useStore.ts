import { create } from 'zustand';
import createAuthSlice from './slices/authSlice';
import createHeatmapSlice from './slices/heatmapSlice';
import createSettingSlice from './slices/settingSlice';

const useAppStore = create<any>()((...a) => ({
  ...createAuthSlice(...a),
  ...createHeatmapSlice(...a),
  ...createSettingSlice(...a),
}));

export default useAppStore;
