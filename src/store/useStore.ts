import { create } from 'zustand';
import createAuthSlice from './slices/authSlice';
import createHeatmapSlice from './slices/heatmapSlice';

const useAppStore = create<any>()((...a) => ({
  ...createAuthSlice(...a),
  ...createHeatmapSlice(...a),
}));

export default useAppStore;
