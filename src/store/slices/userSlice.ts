import { StateCreator } from 'zustand';

import IUser, { patchUserPayload } from '../types/IUser';
import { axiosInstance } from '../../axiosInstance';

const createUserSlice: StateCreator<IUser> = (set, get) => ({
  patchUser: async (payload: patchUserPayload) => {
    try {
      const { data } = await axiosInstance.patch(`/users/@me`, { ...payload });
      return data;
    } catch (error) {}
  },
});

export default createUserSlice;
