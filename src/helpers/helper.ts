import jwt_decode from 'jwt-decode';
import moment from 'moment';

import { FlattenedChannel } from '../components/announcements/create/publicMessageContainer/TcPublicMessageContainer';
import { Channel, SelectedSubChannels } from '../context/ChannelContext';
import { IDecodedToken } from '../utils/interfaces';
import { IGuildChannels, IUser } from '../utils/types';

export function capitalizeFirstChar(str: string): string {
  return str?.charAt(0).toUpperCase() + str.slice(1);
}

export function truncateCenter(text: string, maxLength = 10): string {
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

export function calculateSelectedChannelSize(
  selectedSubChannels: SelectedSubChannels
) {
  let count = 0;
  for (const channelId in selectedSubChannels) {
    for (const subChannelId in selectedSubChannels[channelId]) {
      if (selectedSubChannels[channelId][subChannelId]) {
        count++;
      }
    }
  }
  return count;
}

export function extractTrueSubChannelIds(
  selectedSubChannels: SelectedSubChannels
) {
  const trueSubChannelIds: string[] = [];

  Object.entries(selectedSubChannels).forEach(([channelId, subChannels]) => {
    Object.entries(subChannels).forEach(([subChannelId, isSelected]) => {
      if (isSelected) {
        trueSubChannelIds.push(subChannelId);
      }
    });
  });

  return trueSubChannelIds;
}

export function isDarkColor(colorValue: string | number): boolean {
  let hexColor: string;

  if (typeof colorValue === 'number') {
    hexColor =
      colorValue !== 0
        ? `#${colorValue.toString(16).padStart(6, '0')}`
        : '#96A5A6';
  } else {
    hexColor = colorValue;
  }

  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance < 150;
}

export function hexToRGBA(hex: string, opacity: number): string {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    // 6 digits
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function validateDateTime(date: Date | null, time: Date | null) {
  if (date && time) {
    const selectedDateTime = moment(date).set({
      hour: time.getHours(),
      minute: time.getMinutes(),
      second: 0,
    });

    return selectedDateTime.isAfter(moment());
  }
  return false;
}

export function flattenChannels(
  channels: IGuildChannels[] | Channel[],
  selectedSubChannels: SelectedSubChannels
) {
  const flattened: FlattenedChannel[] = [];

  channels.forEach((channel) => {
    if (channel.subChannels) {
      channel.subChannels.forEach((subChannel) => {
        if (selectedSubChannels[channel.channelId]?.[subChannel.channelId]) {
          flattened.push({
            id: subChannel.channelId,
            label: subChannel.name,
          });
        }
      });
    }
  });

  return flattened;
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
