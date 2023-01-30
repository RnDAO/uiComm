import axios from 'axios';
import { conf } from './configs/index';
import { StorageService } from './services/StorageService';
import router from 'next/router';

import { toast } from 'react-toastify';

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
    StorageService.removeLocalStorage('RNDAO_refreshToken');
    StorageService.removeLocalStorage('RNDAO_access_token');
    StorageService.writeLocalStorage('access_token', data.accessToken);
    StorageService.writeLocalStorage('refresh_Token', data.refreshToken);
  } catch (error) {}
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    console.log(error.response.data.message);
    
    switch (error.response.status) {
      case 400:
        toast.error(`${error.response.data.message}`, {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
        break;
      case 401:
        localStorage.removeItem('RNDAO_refreshToken');
        localStorage.removeItem('RNDAO_access_token');
        router.push('/');
        toast.error('Token expired...', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
        break;
      case 404:
        toast.error(`${error.response.data.message}`, {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
        break;
      case 590:
        toast.error(`${error.response.data.message}`, {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
        break;

      default:
        break;
    }
    return Promise.reject(error);
  }
);
