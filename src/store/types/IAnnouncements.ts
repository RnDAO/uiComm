export interface IRetrieveAnnouncementsProps {
  page: number;
  limit: number;
  sortBy?: string;
  name?: string;
  community: string;
}

export default interface IAnnouncements {
  retrieveAnnouncements: ({
    page,
    limit,
    sortBy,
    name,
    community,
  }: IRetrieveAnnouncementsProps) => void;
}
