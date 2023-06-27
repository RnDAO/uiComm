export default interface IHeatmap {
  isActiveMembersBreakdownLoading: boolean;
  isRolesLoading: boolean;
  roles: any[];
  getActiveMemberCompositionTable: (
    guild_id: string,
    activityComposition: string[],
    roles: string[],
    username?: string,
    sortBy: string,
    page?: number // Add page as an optional parameter
  ) => any;
  getRoles: (guild_id: string) => any;
}
