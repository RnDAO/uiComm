import axios from 'axios';
import { conf } from './configs/index';
import useAppStore from './store/useStore';
import { StorageService } from './services/StorageService';

export const axiosInstance = axios.create({
  baseURL: conf.API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const accessToken = StorageService.readLocalStorage<string>(
      'access_token',
      'string'
    );
    if (accessToken) {
      config.headers!['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    const refreshToken = StorageService.readLocalStorage<string>(
      'refresh_Token',
      'string'
    );
    const { data } = await axiosInstance.post(`/auth/refresh-tokens`, {
      refreshToken: refreshToken,
    });
    StorageService.removeLocalStorage('RNDAO_refreshToken')
    StorageService.removeLocalStorage('RNDAO_access_token')
    StorageService.writeLocalStorage('access_token', data.accessToken);
    StorageService.writeLocalStorage('refresh_Token', data.refreshToken);
  } catch (error) { }
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status == 401) {
      await refreshToken();
    }
  }
);
