import axios from 'axios';
import { conf } from './configs/index';

export const axiosInstance = axios.create({
  baseURL: conf.API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config:any) {
    const user: any = localStorage.getItem('user');
    const accessToken = JSON.parse(user).accessToken;
    console.log('accessToken', accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
