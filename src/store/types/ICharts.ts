export default interface ICharts {
  isLoading: boolean;
  interactionsLoading: boolean;
  activeMembersLoading: boolean;
  disengagedMembersLoading: boolean;
  inactiveMembersLoading: boolean;
  onboardingMembersLoading: boolean;
  heatmapRecords: any[];
  interactions: {};
  activeMembers: {};
  disengagedMembers: {};
  inactiveMembers: {};
  onboardingMembers: {};
  selectedChannelsList: any[];
  fetchHeatmapData: (
    platformId: string,
    startDate: string,
    endDate: string,
    timeZone: string,
    channelIds: string[]
  ) => any;
  fetchInteractions: (
    guild_id: string,
    startDate: string,
    endDate: string,
    timeZone: string
  ) => any;
  fetchActiveMembers: (
    platformId: string,
    startDate: string,
    endDate: string,
    timeZone: string
  ) => any;
  fetchDisengagedMembers: (
    guild_id: string,
    startDate: string,
    endDate: string,
    timeZone: string
  ) => any;
  fetchInactiveMembers: (
    guild_id: string,
    startDate: string,
    endDate: string,
    timeZone: string
  ) => any;
  fetchOnboardingMembers: (
    guild_id: string,
    startDate: string,
    endDate: string,
    timeZone: string
  ) => any;
  getSelectedChannelsList: (guild_id: string) => any;
}
