import { StateCreator } from 'zustand';

import IModule from '../types/IModule';
import { axiosInstance } from '../../axiosInstance';

const createModuleSlice: StateCreator<IModule> = (set, get) => ({
  createModule: async ({ name, community }) => {
    try {
      const { data } = await axiosInstance.post('/modules', {
        name,
        community,
      });
      return data;
    } catch (error) {}
  },
  retrieveModules: async ({ name, community, limit, page, sortBy }) => {
    try {
      const params = {
        page,
        limit,
        sortBy,
        ...(name ? { name } : {}),
        ...(community ? { community } : {}),
      };
      const { data } = await axiosInstance.get('/modules', { params });
      return data;
    } catch (error) {}
  },
  reteriveModuleById: async (moduleId) => {
    try {
      const { data } = await axiosInstance.get(`/modules/${moduleId}`);
      return data;
    } catch (error) {}
  },
  patchModule: async ({ moduleId, payload }) => {
    try {
      const { data } = await axiosInstance.patch(`/modules/${moduleId}`, {
        options: payload,
      });
      return data;
    } catch (error) {}
  },
});

export default createModuleSlice;
