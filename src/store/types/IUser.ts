export interface patchUserPayload {
  email?: string;
  tcaAt: string;
}

export default interface IUser {
  patchUser: (payload: patchUserPayload) => void;
}
