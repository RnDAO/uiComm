import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import ISetting from '../types/ISetting';

const createSettingSlice: StateCreator<ISetting> = (set, get) => ({
  isLoading: false,
});

export default createSettingSlice;
