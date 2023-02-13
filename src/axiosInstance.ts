import axios from 'axios';
import { conf } from './configs/index';
import { StorageService } from './services/StorageService';
import router from 'next/router';

import { toast } from 'react-toastify';
import { IUser } from './utils/types';

export const axiosInstance = axios.create({
  baseURL: conf.API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const user: IUser | undefined =
      StorageService.readLocalStorage<IUser>('user');

    if (user) {
      const { token } = user;

      if (token.accessToken) {
        config.headers!['Authorization'] = `Bearer ${token.accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
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
        StorageService.removeLocalStorage('user');
        StorageService.removeLocalStorage('analysis_state');
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
