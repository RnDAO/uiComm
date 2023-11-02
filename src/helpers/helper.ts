import { IDecodedToken } from '../utils/interfaces';
import { IUser } from '../utils/types';
import jwt_decode from 'jwt-decode';

export function capitalizeFirstChar(str: string): string {
  return str?.charAt(0).toUpperCase() + str.slice(1);
}

export function truncateCenter(text: string, maxLength: number = 10): string {
  if (text.length <= maxLength) return text;

  const sideLength = Math.floor((maxLength - 3) / 2); // Subtract 3 for "..."
  return text.slice(0, sideLength) + '...' + text.slice(-sideLength);
}

export function decodeUserTokenDiscordId(user?: IUser): string | null {
  if (user?.token?.accessToken) {
    const decodedToken: IDecodedToken = jwt_decode(user.token.accessToken);
    return decodedToken.sub;
  }
  return null;
}

export function extractUrlParams(path: string): { [key: string]: string } {
  const urlObj = new URL(path, window.location.origin);
  const params = Array.from(urlObj.searchParams.entries());
  const queryParams: { [key: string]: string } = {};

  params.forEach(([key, value]) => {
    queryParams[key] = value;
  });

  return queryParams;
}

export function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout | null;

  return function executedFunction(...args: any[]) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}
