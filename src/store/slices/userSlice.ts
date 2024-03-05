import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import IUser, { patchUserPayload } from '../types/IUser';

const createUserSlice: StateCreator<IUser> = (set, get) => ({
  patchUser: async (payload: patchUserPayload) => {
    try {
      const { data } = await axiosInstance.patch(`/users/@me`, { ...payload });
      return data;
    } catch (error) {}
  },
});

export default createUserSlice;
