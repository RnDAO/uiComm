import { IDecodedToken } from '../utils/interfaces';
import { IUser } from '../utils/types';
import jwt_decode from 'jwt-decode';

export function capitalizeFirstChar(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function decodeUserTokenDiscordId(user?: IUser): string | null {
  if (user?.token?.accessToken) {
    const decodedToken: IDecodedToken = jwt_decode(user.token.accessToken);
    return decodedToken.sub;
  }
  return null;
}
