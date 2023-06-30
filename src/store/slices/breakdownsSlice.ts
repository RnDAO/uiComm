import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import IBreakdown from '../types/IBreakdown';

const createBreakdownsSlice: StateCreator<IBreakdown> = (set, get) => ({
  isActiveMembersBreakdownLoading: false,
  isRolesLoading: false,
  roles: [],
  getActiveMemberCompositionTable: async (
    guild_id: string,
    activityComposition: string[],
    roles: string[],
    username?: string,
    sortBy?: string,
    page?: number
  ) => {
    try {
      set(() => ({ isActiveMembersBreakdownLoading: true }));

      const requestData = {
        activityComposition: activityComposition || [],
        roles: roles || [],
        username: username || undefined,
      };

      const params = new URLSearchParams();
      if (page) {
        params.append('page', page.toString());
      }
      if (sortBy) {
        params.append('sortBy', `joinedAt:${sortBy}`);
      }

      requestData.activityComposition.forEach((value) => {
        params.append('activityComposition', value);
      });

      requestData.roles.forEach((value) => {
        params.append('roles', value);
      });

      if (username) {
        params.append('username', username);
      }

      const url = `/member-activity/${guild_id}/active-members-composition-table?${params.toString()}`;

      const { data } = await axiosInstance.get(url);

      set(() => ({ isActiveMembersBreakdownLoading: false }));
      return data;
    } catch (error) {
      set(() => ({ isActiveMembersBreakdownLoading: false }));
      // Handle the error
    }
  },
  getOnboardingMemberCompositionTable: async (
    guild_id: string,
    activityComposition: string[],
    roles: string[],
    username?: string,
    sortBy?: string,
    page?: number
  ) => {
    try {
      set(() => ({ isActiveMembersBreakdownLoading: true }));

      const requestData = {
        activityComposition: activityComposition || [],
        roles: roles || [],
        username: username || undefined,
      };

      const params = new URLSearchParams();
      if (page) {
        params.append('page', page.toString());
      }
      if (sortBy) {
        params.append('sortBy', `joinedAt:${sortBy}`);
      }

      requestData.activityComposition.forEach((value) => {
        params.append('activityComposition', value);
      });

      requestData.roles.forEach((value) => {
        params.append('roles', value);
      });

      if (username) {
        params.append('username', username);
      }

      const url = `/member-activity/${guild_id}/active-members-onboarding-table?${params.toString()}`;

      const { data } = await axiosInstance.get(url);

      set(() => ({ isActiveMembersBreakdownLoading: false }));
      return data;
    } catch (error) {
      set(() => ({ isActiveMembersBreakdownLoading: false }));
      // Handle the error
    }
  },
  getRoles: async (guild_id: string) => {
    try {
      set(() => ({ isRolesLoading: true }));

      const { data } = await axiosInstance.get(`/guilds/${guild_id}/roles`);

      set(() => ({ roles: data, isRolesLoading: false }));
      return data;
    } catch (error) {
      set(() => ({ isRolesLoading: false }));
    }
  },
});

export default createBreakdownsSlice;
