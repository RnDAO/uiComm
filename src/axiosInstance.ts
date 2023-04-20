import axios from 'axios';
import { conf } from './configs/index';
import { StorageService } from './services/StorageService';
import router from 'next/router';

import { toast } from 'react-toastify';
import { IUser } from './utils/types';

let isRefreshing = false;
let refreshQueue: Array<Function> = [];

export const axiosInstance = axios.create({
  baseURL: conf.API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config: any) => {
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
        const user: IUser | undefined =
          StorageService.readLocalStorage<IUser>('user');

        if (user) {
          const { token } = user;
          if (token.refreshToken) {
            if (!isRefreshing) {
              isRefreshing = true;

              try {
                const response = await axiosInstance.post(
                  '/auth/refresh-tokens',
                  {
                    refreshToken: token.refreshToken,
                  }
                );

                StorageService.writeLocalStorage('user', {
                  guild: user.guild,
                  token: {
                    accessToken: response.data.access.token,
                    refreshToken: response.data.refresh.token,
                  },
                });

                axiosInstance.defaults.headers['Authorization'] =
                  'Bearer ' + response.data.access.token;

                refreshQueue.forEach((cb) => cb(response.data.access.token));
                refreshQueue = [];
                return axiosInstance(error.config);
              } catch (error) {
                toast.error('Token expired...', {
                  position: 'bottom-left',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: 0,
                });
              } finally {
                isRefreshing = false;
              }
            }
            return new Promise((resolve) => {
              refreshQueue.push((newToken: string) => {
                error.config.headers['Authorization'] = `Bearer ${newToken}`;
                resolve(axiosInstance(error.config));
              });
            });
          }
        }
        StorageService.removeLocalStorage('user');
        StorageService.removeLocalStorage('analysis_state');
        toast.error('Token expired...', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
        router.push('/');
        return Promise.reject(error);
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
