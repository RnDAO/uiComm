import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import IAnnouncements, {
  IRetrieveAnnouncementsProps,
} from '../types/IAnnouncements';
import { CreateAnnouncementsPayload } from '../../pages/announcements/create-new-announcements';

const createAnnouncementsSlice: StateCreator<IAnnouncements> = (set, get) => ({
  retrieveAnnouncements: async ({
    page,
    limit,
    sortBy,
    name,
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
        ...(name ? { name } : {}),
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
  patchExistingAnnouncement: async (id: string) => {
    try {
      const { data } = await axiosInstance.post(`/announcements/${id}`);
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
});

export default createAnnouncementsSlice;
