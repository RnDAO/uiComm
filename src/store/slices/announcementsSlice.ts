import { StateCreator } from 'zustand';
import { axiosInstance } from '../../axiosInstance';
import IAnnouncements from '../types/IAnnouncements';

const createAnnouncementsSlice: StateCreator<IAnnouncements> = (set, get) => ({
  retrieveAnnouncements: async () => {
    try {
      const { data } = await axiosInstance.get(`/announcements/`);
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
  createNewAnnouncements: async () => {
    try {
      const { data } = await axiosInstance.post(`/announcements/`);
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
      const { data } = await axiosInstance.delete(`/platforms/${id}`);
      return data;
    } catch (error) {
      console.error('Failed to delete announcements:', error);
    }
  },
});

export default createAnnouncementsSlice;
