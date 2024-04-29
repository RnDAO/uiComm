import { StateCreator } from 'zustand';

import IUser, {
  getUserCommunityRolePayload,
  patchUserPayload,
} from '../types/IUser';
import { axiosInstance } from '../../axiosInstance';

const createUserSlice: StateCreator<IUser> = (set, get) => ({
  userRolePermissions: [],
  getUser: async () => {
    try {
      const { data } = await axiosInstance.get(`/users/@me`);
      return data;
    } catch (error) {}
  },
  patchUser: async (payload: patchUserPayload) => {
    try {
      const { data } = await axiosInstance.patch(`/users/@me`, { ...payload });
      return data;
    } catch (error) {}
  },
  getUserCommunityRole: async (communityId: getUserCommunityRolePayload) => {
    try {
      const { data } = await axiosInstance.get(
        `/users/@me/${communityId}/roles`
      );
      set({ userRolePermissions: data });
    } catch (error) {}
  },
});

export default createUserSlice;
