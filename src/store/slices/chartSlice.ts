import { StateCreator } from 'zustand';

import ICharts from '../types/ICharts';
import { axiosInstance } from '../../axiosInstance';

const chartSlice: StateCreator<ICharts> = (set, get) => ({
  isLoading: false,
  heatmapRecords: [],
  interactions: {},
  activeMembers: {},
  disengagedMembers: {},
  inactiveMembers: {},
  onboardingMembers: {},
  selectedChannelsList: [],
  interactionsLoading: false,
  activeMembersLoading: false,
  disengagedMembersLoading: false,
  inactiveMembersLoading: false,
  onboardingMembersLoading: false,
  fetchHeatmapData: async (
    platformId: string,
    platformType: 'discord' | 'discourse',
    startDate: string,
    endDate: string,
    timeZone: string,
    channelIds?: string[],
    allCategories?: boolean,
    includeCategories?: string[],
    excludeCategories?: string[]
  ) => {
    try {
      const endpoint =
        platformType === 'discourse'
          ? `/discourse/heatmaps/${platformId}/heatmap-chart`
          : `/heatmaps/${platformId}/heatmap-chart`;

      set(() => ({ isLoading: true }));

      const payload: any = {
        startDate,
        endDate,
        timeZone,
      };

      if (platformType === 'discord' && channelIds) {
        payload.channelIds = channelIds;
      }

      if (platformType === 'discourse') {
        payload.allCategories = allCategories ?? false;

        if (includeCategories && includeCategories.length > 0) {
          payload.include = includeCategories;
        }

        if (excludeCategories && excludeCategories.length > 0) {
          payload.exclude = excludeCategories;
        }
      }

      const { data } = await axiosInstance.post(endpoint, payload);
      set({ heatmapRecords: [...data], isLoading: false });

      return data;
    } catch (error) {
      console.error('Error fetching heatmap data:', error);
      set(() => ({ isLoading: false }));
    }
  },
  fetchInteractions: async (
    platformId: string,
    startDate: string,
    endDate: string,
    platformType: 'discord' | 'discourse'
  ) => {
    const endpoint =
      platformType === 'discourse'
        ? `/discourse/heatmaps/${platformId}/line-graph`
        : `/heatmaps/${platformId}/line-graph`;

    try {
      set(() => ({ interactionsLoading: true }));
      const { data } = await axiosInstance.post(endpoint, {
        startDate,
        endDate,
      });
      set({ interactions: data, interactionsLoading: false });
    } catch (error) {
      set(() => ({ interactionsLoading: false }));
    }
  },
  fetchActiveMembers: async (
    platformId: string,
    startDate: string,
    endDate: string
  ) => {
    try {
      set(() => ({ activeMembersLoading: true }));
      const { data } = await axiosInstance.post(
        `/member-activity/${platformId}/active-members-composition-line-graph`,
        {
          startDate,
          endDate,
        }
      );
      set({ activeMembers: data, activeMembersLoading: false });
    } catch (error) {
      set(() => ({ activeMembersLoading: false }));
    }
  },
  fetchDisengagedMembers: async (
    platformId: string,
    startDate: string,
    endDate: string
  ) => {
    try {
      set(() => ({ disengagedMembersLoading: true }));
      const { data } = await axiosInstance.post(
        `/member-activity/${platformId}/disengaged-members-composition-line-graph`,
        {
          startDate,
          endDate,
        }
      );
      set({ disengagedMembers: data, disengagedMembersLoading: false });
    } catch (error) {
      set(() => ({ disengagedMembersLoading: false }));
    }
  },
  fetchInactiveMembers: async (
    platformId: string,
    startDate: string,
    endDate: string
  ) => {
    try {
      set(() => ({ inactiveMembersLoading: true }));
      const { data } = await axiosInstance.post(
        `/member-activity/${platformId}/inactive-members-line-graph `,
        {
          startDate,
          endDate,
        }
      );
      set({ inactiveMembers: data, inactiveMembersLoading: false });
    } catch (error) {
      set(() => ({ inactiveMembersLoading: false }));
    }
  },
  fetchOnboardingMembers: async (
    platformId: string,
    startDate: string,
    endDate: string
  ) => {
    try {
      set(() => ({ onboardingMembersLoading: true }));
      const { data } = await axiosInstance.post(
        `/member-activity/${platformId}/active-members-onboarding-line-graph `,
        {
          startDate,
          endDate,
        }
      );
      set({ onboardingMembers: data, onboardingMembersLoading: false });
    } catch (error) {
      set(() => ({ onboardingMembersLoading: false }));
    }
  },
  getSelectedChannelsList: async (platformId: string) => {
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axiosInstance.get(
        `/guilds/${platformId}/selected-channels`
      );
      set({ selectedChannelsList: data, isLoading: false });
      return data;
    } catch (error) {
      set(() => ({ isLoading: false }));
    }
  },
});

export default chartSlice;
