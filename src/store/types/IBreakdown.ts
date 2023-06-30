export default interface IHeatmap {
  isActiveMembersBreakdownLoading: boolean;
  isRolesLoading: boolean;
  roles: any[];
  getActiveMemberCompositionTable: (
    guild_id: string,
    activityComposition: string[],
    roles: string[],
    username?: string,
    sortBy?: string,
    page?: number
  ) => any;
  getOnboardingMemberCompositionTable: (
    guild_id: string,
    activityComposition: string[],
    roles: string[],
    username?: string,
    sortBy?: string,
    page?: number
  ) => any;
  getRoles: (guild_id: string) => any;
}
