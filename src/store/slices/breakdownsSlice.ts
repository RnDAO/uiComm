import { StateCreator } from 'zustand';

import IBreakdown from '../types/IBreakdown';
import { axiosInstance } from '../../axiosInstance';
import { IRolesPayload } from '../../components/pages/statistics/memberBreakdowns/CustomTable';

const createBreakdownsSlice: StateCreator<IBreakdown> = (set, get) => ({
  isActiveMembersBreakdownLoading: false,
  isOnboardingMembersBreakdownLoading: false,
  isDisengagedMembersCompositionBreakdownLoading: false,
  isRolesLoading: false,
  roles: [],
  getActiveMemberCompositionTable: async (
    platformId: string,
    activityComposition: string[],
    roles: IRolesPayload,
    username?: string,
    sortBy?: string,
    page?: number,
    limit?: number
  ) => {
    try {
      const requestData = {
        activityComposition: activityComposition || [],
        roles: roles || [],
        username: username || undefined,
      };

      const params = new URLSearchParams();
      if (page) {
        params.append('page', page.toString());
      }
      if (limit) {
        params.append('limit', limit.toString());
      }
      if (sortBy) {
        params.append('sortBy', `joinedAt:${sortBy}`);
      }

      requestData.activityComposition.forEach((value) => {
        params.append('activityComposition', value);
      });

      if (username) {
        params.append('ngu', username);
      }

      const url = `/member-activity/${platformId}/active-members-composition-table?${params.toString()}`;

      const { data } = await axiosInstance.post(url, roles);

      return data;
    } catch (error) {}
  },
  getOnboardingMemberCompositionTable: async (
    platformId: string,
    activityComposition: string[],
    roles: IRolesPayload,
    username?: string,
    sortBy?: string,
    page?: number,
    limit?: number
  ) => {
    try {
      const requestData = {
        activityComposition: activityComposition || [],
        roles: roles || [],
        username: username || undefined,
      };

      const params = new URLSearchParams();
      if (page) {
        params.append('page', page.toString());
      }
      if (limit) {
        params.append('limit', limit.toString());
      }
      if (sortBy) {
        params.append('sortBy', `joinedAt:${sortBy}`);
      }

      requestData.activityComposition.forEach((value) => {
        params.append('activityComposition', value);
      });

      if (username) {
        params.append('ngu', username);
      }

      const url = `/member-activity/${platformId}/active-members-onboarding-table?${params.toString()}`;

      const { data } = await axiosInstance.post(url, roles);

      return data;
    } catch (error) {}
  },
  getDisengagedMembersCompositionTable: async (
    platformId: string,
    activityComposition: string[],
    roles: IRolesPayload,
    username?: string,
    sortBy?: string,
    page?: number,
    limit?: number
  ) => {
    try {
      const requestData = {
        activityComposition: activityComposition || [],
        roles: roles || [],
        username: username || undefined,
      };

      const params = new URLSearchParams();
      if (page) {
        params.append('page', page.toString());
      }
      if (limit) {
        params.append('limit', limit.toString());
      }
      if (sortBy) {
        params.append('sortBy', `joinedAt:${sortBy}`);
      }

      requestData.activityComposition.forEach((value) => {
        params.append('activityComposition', value);
      });

      if (username) {
        params.append('ngu', username);
      }

      const url = `/member-activity/${platformId}/disengaged-members-composition-table?${params.toString()}`;

      const { data } = await axiosInstance.post(url, roles);

      return data;
    } catch (error) {}
  },
});

export default createBreakdownsSlice;
