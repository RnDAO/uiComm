import { StateCreator } from 'zustand';

import IAnnouncements, {
  IPatchExistingAnnouncementsProps,
  IRetrieveAnnouncementsProps,
} from '../types/IAnnouncements';
import { axiosInstance } from '../../axiosInstance';
import { CreateAnnouncementsPayload } from '../../pages/announcements/create-new-announcements';

const createAnnouncementsSlice: StateCreator<IAnnouncements> = (set, get) => ({
  retrieveAnnouncements: async ({
    page,
    limit,
    sortBy = 'scheduledAt:asc',
    timeZone,
    startDate,
    endDate,
    community,
  }: IRetrieveAnnouncementsProps) => {
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
        `/announcements/?communityId=${community}`,
        { params }
      );

      return data;
    } catch (error) {
      console.error('Failed to retrieve announcements:', error);
    }
  },
  retrieveAnnouncementById: async (id: string) => {
    try {
      const { data } = await axiosInstance.get(`/announcements/${id}`);
      return data;
    } catch (error) {
      console.error('Failed to retrieve announcement:', error);
    }
  },
  createNewAnnouncements: async (
    announcementPayload: CreateAnnouncementsPayload
  ) => {
    try {
      const { data } = await axiosInstance.post(
        `/announcements/`,
        announcementPayload
      );
      return data;
    } catch (error) {
      console.error('Failed to create announcements:', error);
    }
  },
  patchExistingAnnouncement: async ({
    id,
    announcementPayload,
  }: IPatchExistingAnnouncementsProps) => {
    try {
      const { data } = await axiosInstance.patch(
        `/announcements/${id}`,
        announcementPayload
      );
      return data;
    } catch (error) {
      console.error('Failed to patch announcements:', error);
    }
  },
  deleteAnnouncements: async (id: string) => {
    try {
      const { data } = await axiosInstance.delete(`/announcements/${id}`);
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
