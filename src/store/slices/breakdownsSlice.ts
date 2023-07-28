import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import IBreakdown from '../types/IBreakdown';

const createBreakdownsSlice: StateCreator<IBreakdown> = (set, get) => {
  const fetchData = async (
    guild_id: string,
    activityComposition: string[],
    roles: string[],
    loadingType: string,
    urlPath: string,
    username?: string,
    sortBy?: string,
    page?: number
  ) => {
    try {
      set({ [loadingType]: true });

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

      const url = `/member-activity/${guild_id}/${urlPath}?${params.toString()}`;

      const { data } = await axiosInstance.get(url);

      set({ [loadingType]: false });
      return data;
    } catch (error) {
      set({ [loadingType]: false });
      // Handle the error
    }
  };

  return {
    isActiveMembersBreakdownLoading: false,
    isOnboardingMembersBreakdownLoading: false,
    isDisengagedMembersCompositionBreakdownLoading: false,
    isRolesLoading: false,
    roles: [],
    getActiveMemberCompositionTable: (
      guild_id: string,
      activityComposition: string[],
      roles: string[],
      username?: string,
      sortBy?: string,
      page?: number
    ) =>
      fetchData(
        guild_id,
        activityComposition,
        roles,
        'isActiveMembersBreakdownLoading',
        'active-members-composition-table',
        username,
        sortBy,
        page
      ),

    getOnboardingMemberCompositionTable: (
      guild_id: string,
      activityComposition: string[],
      roles: string[],
      username?: string,
      sortBy?: string,
      page?: number
    ) =>
      fetchData(
        guild_id,
        activityComposition,
        roles,
        'isOnboardingMembersBreakdownLoading',
        'active-members-onboarding-table',
        username,
        sortBy,
        page
      ),

    getDisengagedMembersCompositionTable: (
      guild_id: string,
      activityComposition: string[],
      roles: string[],
      username?: string,
      sortBy?: string,
      page?: number
    ) =>
      fetchData(
        guild_id,
        activityComposition,
        roles,
        'isDisengagedMembersCompositionBreakdownLoading',
        'disengaged-members-composition-table',
        username,
        sortBy,
        page
      ),

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
  };
};

export default createBreakdownsSlice;
