export interface patchUserPayload {
  email?: string;
  tcaAt: string;
}

export interface getUserCommunityRolePayload {
  communityId: string;
}

export default interface IUser {
  userRolePermissions: 'admin' | 'view'[];
  getUser: () => void;
  patchUser: (payload: patchUserPayload) => void;
  getUserCommunityRole: (
    communityId: getUserCommunityRolePayload
  ) => Promise<void>;
}
