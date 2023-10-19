import { StateCreator } from 'zustand';
import ICentric from '../types/ICentric';
import { conf } from '../../configs';
import { axiosInstance } from '../../axiosInstance';
import { StorageService } from '../../services/StorageService';

const BASE_URL = conf.API_BASE_URL;

const createAuthSlice: StateCreator<ICentric> = (set, get) => ({
  discordAuthorization: () => {
    location.replace(`${BASE_URL}/auth/discord/authorize`);
  },
});

export default createAuthSlice;
