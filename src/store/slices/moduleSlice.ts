import { StateCreator } from 'zustand';

import IModule from '../types/IModule';
import { axiosInstance } from '../../axiosInstance';

const createModuleSlice: StateCreator<IModule> = (set, get) => ({
  dynamicNFTModuleInfo: null,

  createModule: async ({ name, community }) => {
    try {
      const { data } = await axiosInstance.post('/modules', {
        name,
        community,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
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

      const dynamicNFTModule = data.results.find(
        (module: any) =>
          module.name === 'dynamicNft' &&
          module.options.platforms.some(
            (platform: any) => platform.metadata?.transactionHash
          )
      );

      set({
        dynamicNFTModuleInfo: dynamicNFTModule
          ? {
              isNFTModuleEnabled: true,
              metadata: dynamicNFTModule.options.platforms
                .filter((platform: any) => platform.metadata?.transactionHash)
                .map((platform: any) => ({
                  transactionHash: platform.metadata.transactionHash,
                  tokenId: platform.metadata.tokenId,
                  platformId: platform._id,
                })),
            }
          : { isNFTModuleEnabled: false, metadata: null },
      });

      return data;
    } catch (error) {
      set({
        dynamicNFTModuleInfo: { isNFTModuleEnabled: false, metadata: null },
      });
      console.error(error);
    }
  },

  retrieveModuleById: async (moduleId) => {
    try {
      const { data } = await axiosInstance.get(`/modules/${moduleId}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  patchModule: async ({ moduleId, payload }) => {
    try {
      const { data } = await axiosInstance.patch(`/modules/${moduleId}`, {
        options: payload,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  },
});

export default createModuleSlice;
