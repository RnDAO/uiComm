export interface IRetrieveAnnouncementsProps {
  page: number;
  limit: number;
  sortBy?: string;
  ngu?: string;
  community: string;
  startDate?: string;
  endDate?: string;
  timeZone: string;
}

export default interface IAnnouncements {
  retrieveAnnouncements: ({
    page,
    limit,
    sortBy,
    ngu,
    community,
  }: IRetrieveAnnouncementsProps) => void;
}
