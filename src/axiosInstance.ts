import axios from 'axios';
import { conf } from './configs/index';
import { StorageService } from './services/StorageService';
import * as Sentry from '@sentry/nextjs';

import { IUser } from './utils/types';
import { tokenRefreshEventEmitter } from './services/EventEmitter';
import toastHelper from './helper/toastHelper';

let isRefreshing = false;

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
        toastHelper(error.response.data.message, 'error');
        break;
      case 401:
        const user: IUser | undefined =
          StorageService.readLocalStorage<IUser>('user');

        if (
          error.response?.status === 401 &&
          error.config.url?.endsWith('/auth/refresh-tokens')
        ) {
          StorageService.removeLocalStorage('user');
          StorageService.removeLocalStorage('analysis_state');
          toastHelper('Session expired. Please log in again.', 'error');
          if (typeof window !== 'undefined') {
            // Use window object here
            window.location.href = '/';
          }
        } else if (
          !error.config.url?.endsWith('/auth/refresh-tokens') &&
          user
        ) {
          const { token } = user;

          if (token.refreshToken && !isRefreshing) {
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

              // When the refresh is successful, notify listeners
              tokenRefreshEventEmitter.emit(
                'tokenRefresh',
                response.data.access.token
              );

              return axiosInstance(error.config);
            } catch (error) {
              // Handle refresh failure
              StorageService.removeLocalStorage('user');
              StorageService.removeLocalStorage('analysis_state');

              window.location.href = '/';
            } finally {
              isRefreshing = false;
            }
          } else if (token.refreshToken && isRefreshing) {
            // If a refresh is already in progress, listen for the completion event
            return new Promise((resolve, reject) => {
              tokenRefreshEventEmitter.subscribe('tokenRefresh', (newToken) => {
                error.config.headers['Authorization'] = `Bearer ${newToken}`;
                resolve(axiosInstance(error.config));
              });
            });
          }
        } else {
          // Handle no user case
          StorageService.removeLocalStorage('user');
          StorageService.removeLocalStorage('analysis_state');
          toastHelper('Token expired...', 'error');
          window.location.href = '/';
        }
        break;
      case 404:
        toastHelper(error.response.data.message, 'error');
        Sentry.captureException(
          new Error(
            `API responded with status code ${error.response.status}: ${error.response.data.message}`
          )
        );
        break;
      case 440:
        StorageService.removeLocalStorage('user');
        StorageService.removeLocalStorage('analysis_state');
        toastHelper(error.response.data.message, 'error');
        window.location.href = '/';

        Sentry.captureException(
          new Error(
            `API responded with status code ${error.response.status}: ${error.response.data.message}`
          )
        );
        break;
      case 590:
        toastHelper(error.response.data.message, 'error');
        Sentry.captureException(
          new Error(
            `API responded with status code ${error.response.status}: ${error.response.data.message}`
          )
        );
        break;

      default:
        break;
    }
    return Promise.reject(error);
  }
);
