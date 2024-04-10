import { StateCreator } from 'zustand';

import IAnnouncements, {
  IPatchExistingAnnouncementsProps,
  IRetrieveAnnouncementsProps,
} from '../types/IAnnouncements';
import { axiosInstance } from '../../axiosInstance';
import { CreateAnnouncementsPayload } from '../../pages/announcements/create-new-announcements';

const createAnnouncementsSlice: StateCreator<IAnnouncements> = (set, get) => ({
  retrieveAnnouncements: async (
    platformId: string,
    {
      page,
      limit,
      sortBy = 'scheduledAt:desc',
      timeZone,
      startDate,
      endDate,
      community,
    }: IRetrieveAnnouncementsProps
  ) => {
    try {
      const params = {
        page,
        limit,
        sortBy,
        ...(timeZone ? { timeZone } : {}),
        ...(startDate ? { startDate } : {}),
        ...(endDate ? { endDate } : {}),
      };

      const { data } = await axiosInstance.get(
        `/announcements/${platformId}/?communityId=${community}`,
        { params }
      );

      return data;
    } catch (error) {
      console.error('Failed to retrieve announcements:', error);
    }
  },
  retrieveAnnouncementById: async (
    platformId: string,
    announcementsId: string
  ) => {
    try {
      const { data } = await axiosInstance.get(
        `/announcements/${platformId}/${announcementsId}`
      );
      return data;
    } catch (error) {
      console.error('Failed to retrieve announcement:', error);
    }
  },
  createNewAnnouncements: async (
    platformId: string,
    announcementPayload: CreateAnnouncementsPayload
  ) => {
    try {
      const { data } = await axiosInstance.post(
        `/announcements/${platformId}`,
        announcementPayload
      );
      return data;
    } catch (error) {
      console.error('Failed to create announcements:', error);
    }
  },
  patchExistingAnnouncement: async (
    platformId,
    { announcementsId, announcementPayload }: IPatchExistingAnnouncementsProps
  ) => {
    try {
      const { data } = await axiosInstance.patch(
        `/announcements/${platformId}/${announcementsId}`,
        announcementPayload
      );
      return data;
    } catch (error) {
      console.error('Failed to patch announcements:', error);
    }
  },
  deleteAnnouncements: async (platformId: string, announcementsId: string) => {
    try {
      const { data } = await axiosInstance.delete(
        `/announcements/${platformId}/${announcementsId}`
      );
      return data;
    } catch (error) {
      console.error('Failed to delete announcements:', error);
    }
  },
  retrieveCategories: async () => {
    try {
      const { data } = await axiosInstance.get('/categories/');
      return data.map((item: string) => ({
        label: item.replaceAll('_', ' '),
        value: item,
      }));
    } catch (error) {
      console.error('Failed to retrieve categories', error);
      return [];
    }
  },
});

export default createAnnouncementsSlice;
