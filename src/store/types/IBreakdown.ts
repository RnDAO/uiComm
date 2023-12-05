import { IRolesPayload } from '../../components/pages/statistics/memberBreakdowns/CustomTable';

export default interface IBreakdown {
  isActiveMembersBreakdownLoading: boolean;
  isOnboardingMembersBreakdownLoading: boolean;
  isDisengagedMembersCompositionBreakdownLoading: boolean;
  isRolesLoading: boolean;
  roles: any[];
  getActiveMemberCompositionTable: (
    platformId: string,
    activityComposition: string[],
    roles: IRolesPayload,
    username?: string,
    sortBy?: string,
    page?: number,
    limit?: number
  ) => any;
  getOnboardingMemberCompositionTable: (
    platformId: string,
    activityComposition: string[],
    roles: IRolesPayload,
    username?: string,
    sortBy?: string,
    page?: number,
    limit?: number
  ) => any;
  getDisengagedMembersCompositionTable: (
    platformId: string,
    activityComposition: string[],
    roles: IRolesPayload,
    username?: string,
    sortBy?: string,
    page?: number,
    limit?: number
  ) => any;
}
