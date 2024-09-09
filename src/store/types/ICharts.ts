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
    platformId: string,
    startDate: string,
    endDate: string,
    platformType: 'discord' | 'discourse',
    timeZone: string
  ) => any;
  fetchActiveMembers: (
    platformId: string,
    startDate: string,
    endDate: string,
    timeZone: string
  ) => any;
  fetchDisengagedMembers: (
    platformId: string,
    startDate: string,
    endDate: string,
    timeZone: string
  ) => any;
  fetchInactiveMembers: (
    platformId: string,
    startDate: string,
    endDate: string,
    timeZone: string
  ) => any;
  fetchOnboardingMembers: (
    platformId: string,
    startDate: string,
    endDate: string,
    timeZone: string
  ) => any;
  getSelectedChannelsList: (platformId: string) => any;
}
