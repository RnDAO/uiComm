export interface patchUserPayload {
	email?: string;
	tcaAt: string;
}

export interface IUserProfile {
	communities: string[];
	createdAt: string;
	updatedAt: string;
	tcaAt: string;
	identities: { _id: string; provider: "discord" | "telegram"; id: string }[];
	id: string;
}

export interface getUserCommunityRolePayload {
	communityId: string;
}

export default interface IUser {
	userProfile: IUserProfile | null;
	userRolePermissions: "admin" | "view"[];
	getUser: () => void;
	patchUser: (payload: patchUserPayload) => void;
	getUserCommunityRole: (
		communityId: getUserCommunityRolePayload,
	) => Promise<void>;
}
