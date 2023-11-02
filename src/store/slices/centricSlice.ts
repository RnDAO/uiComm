import { StateCreator } from 'zustand';
import ICentric, {
  ICreateCommunitieProps,
  IRetrieveCommunitiesProps,
} from '../types/ICentric';
import { conf } from '../../configs';
import { axiosInstance } from '../../axiosInstance';

const BASE_URL = conf.API_BASE_URL;

const createCentricSlice: StateCreator<ICentric> = (set, get) => ({
  discordAuthorization: () => {
    location.replace(`${BASE_URL}/auth/discord/authorize`);
  },
  retrieveCommunities: async ({
    page,
    limit,
    sortBy,
    name,
  }: IRetrieveCommunitiesProps) => {
    try {
      const params = {
        page,
        limit,
        sortBy,
        ...(name ? { name } : {}),
      };

      const { data } = await axiosInstance.get(`/communities/`, { params });
      return data;
    } catch (error) {
      console.error('Failed to retrieve communities:', error);
    }
  },
  createNewCommunitie: async ({
    name,
    avatarURL,
    tcaAt,
  }: ICreateCommunitieProps) => {
    try {
      await axiosInstance.post('communities', {
        name,
        avatarURL,
        tcaAt,
      });
    } catch (error) {}
  },
});

export default createCentricSlice;
