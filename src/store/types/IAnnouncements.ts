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
  id: string;
}

export default interface IAnnouncements {
  retrieveAnnouncements: ({
    page,
    limit,
    sortBy,
    community,
  }: IRetrieveAnnouncementsProps) => void;
  retrieveAnnouncementById: (id: string) => void;
  createNewAnnouncements: (
    announcementPayload: CreateAnnouncementsPayload
  ) => void;
  patchExistingAnnouncement: ({
    announcementPayload,
    id,
  }: IPatchExistingAnnouncementsProps) => void;
  deleteAnnouncements: (id: string) => void;
  retrieveCategories: () => void;
}
