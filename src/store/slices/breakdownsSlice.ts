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
    platformType: 'discord' | 'discourse' | 'telegram',
    activityComposition: string[],
    roles?: IRolesPayload,
    username?: string,
    sortBy?: string,
    page?: number,
    limit?: number
  ) => {
    try {
      const requestData: any = {
        activityComposition: activityComposition || [],
        username: username || undefined,
      };

      if (platformType === 'discord') {
        requestData.roles = roles || [];
      }

      const params = new URLSearchParams();
      if (page) {
        params.append('page', page.toString());
      }
      if (limit) {
        params.append('limit', limit.toString());
      }
      if (sortBy) {
        if (platformType === 'discord') {
          params.append('sortBy', `joinedAt:${sortBy}`);
        } else if (platformType === 'discourse') {
          params.append('sortBy', `joined_at:${sortBy}`);
        }
      }

      requestData.activityComposition.forEach((value: string) => {
        params.append('activityComposition', value);
      });

      if (username) {
        params.append('ngu', username);
      }

      const baseUrl =
        platformType === 'discourse'
          ? `/discourse/member-activity/${platformId}/active-members-composition-table`
          : platformType === 'telegram'
            ? `/telegram/member-activity/${platformId}/active-members-composition-table`
            : `/member-activity/${platformId}/active-members-composition-table`;

      const url = `${baseUrl}?${params.toString()}`;

      const payload = platformType === 'discord' ? roles : {};

      const { data } = await axiosInstance.post(url, payload);

      return data;
    } catch (error) {}
  },
  getOnboardingMemberCompositionTable: async (
    platformId: string,
    platformType: 'discord' | 'discourse' | 'telegram',
    activityComposition: string[],
    roles?: IRolesPayload,
    username?: string,
    sortBy?: string,
    page?: number,
    limit?: number
  ) => {
    try {
      const requestData: any = {
        activityComposition: activityComposition || [],
        username: username || undefined,
      };

      if (platformType === 'discord') {
        requestData.roles = roles || [];
      }

      const params = new URLSearchParams();
      if (page) {
        params.append('page', page.toString());
      }
      if (limit) {
        params.append('limit', limit.toString());
      }
      if (sortBy) {
        if (platformType === 'discord') {
          params.append('sortBy', `joinedAt:${sortBy}`);
        } else if (platformType === 'discourse') {
          params.append('sortBy', `joined_at:${sortBy}`);
        }
      }

      requestData.activityComposition.forEach((value: string) => {
        params.append('activityComposition', value);
      });

      if (username) {
        params.append('ngu', username);
      }

      const baseUrl =
        platformType === 'discourse'
          ? `/discourse/member-activity/${platformId}/active-members-onboarding-table`
          : platformType === 'telegram'
            ? `/telegram/member-activity/${platformId}/active-members-onboarding-table`
            : `/member-activity/${platformId}/active-members-onboarding-table`;

      const url = `${baseUrl}?${params.toString()}`;

      const payload = platformType === 'discord' ? roles : {};

      const { data } = await axiosInstance.post(url, payload);

      return data;
    } catch (error) {}
  },
  getDisengagedMembersCompositionTable: async (
    platformId: string,
    platformType: 'discord' | 'discourse' | 'telegram',
    activityComposition: string[],
    roles?: IRolesPayload,
    username?: string,
    sortBy?: string,
    page?: number,
    limit?: number
  ) => {
    try {
      const requestData: any = {
        activityComposition: activityComposition || [],
        username: username || undefined,
      };

      if (platformType === 'discord') {
        requestData.roles = roles || [];
      }

      const params = new URLSearchParams();
      if (page) {
        params.append('page', page.toString());
      }
      if (limit) {
        params.append('limit', limit.toString());
      }
      if (sortBy) {
        if (platformType === 'discord') {
          params.append('sortBy', `joinedAt:${sortBy}`);
        } else if (platformType === 'discourse') {
          params.append('sortBy', `joined_at:${sortBy}`);
        }
      }

      requestData.activityComposition.forEach((value: string) => {
        params.append('activityComposition', value);
      });

      if (username) {
        params.append('ngu', username);
      }

      const baseUrl =
        platformType === 'discourse'
          ? `/discourse/member-activity/${platformId}/disengaged-members-composition-table`
          : platformType === 'telegram'
            ? `/telegram/member-activity/${platformId}/disengaged-members-composition-table`
            : `/member-activity/${platformId}/disengaged-members-composition-table`;

      const url = `${baseUrl}?${params.toString()}`;

      const payload = platformType === 'discord' ? roles : {};

      const { data } = await axiosInstance.post(url, payload);

      return data;
    } catch (error) {}
  },
});

export default createBreakdownsSlice;
