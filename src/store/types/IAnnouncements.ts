import { CreateAnnouncementsPayload } from '../../pages/announcements/create-new-announcements';

export interface IRetrieveAnnouncementsProps {
  page: number;
  limit: number;
  sortBy?: string;
  community: string;
  startDate?: string;
  endDate?: string;
  timeZone: string;
}

export interface IPatchExistingAnnouncementsProps {
  announcementPayload: CreateAnnouncementsPayload;
  announcementsId: string;
}

export default interface IAnnouncements {
  retrieveAnnouncements: (
    platformId: string,
    { page, limit, sortBy, community }: IRetrieveAnnouncementsProps
  ) => void;
  retrieveAnnouncementById: (
    platformId: string,
    announcementsId: string
  ) => void;
  createNewAnnouncements: (
    platformId: string,
    announcementPayload: CreateAnnouncementsPayload
  ) => void;
  patchExistingAnnouncement: (
    platformId: string,
    { announcementPayload, announcementsId }: IPatchExistingAnnouncementsProps
  ) => void;
  deleteAnnouncements: (platformId: string, announcementsId: string) => void;
  retrieveCategories: () => void;
}
