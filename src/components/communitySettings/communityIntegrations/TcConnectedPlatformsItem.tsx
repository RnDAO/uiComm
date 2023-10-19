/**
 * TcConnectedPlatformsItem Component.
 *
 * This component displays information about a connected platform, such as:
 * - Platform's name and its status (in progress, completed, or error).
 * - An icon representing the platform.
 * - Community details: logo and name.
 *
 * Props:
 * - `icon`: A React element representing the platform's icon.
 *   It can be a JSX element or any component.
 *
 * - `platformTitle`: The name or title of the platform, represented as a string.
 *
 * - `status`: Represents the platform's connection status.
 *   It's an enum value (`PlatformStatus`) that can be one of: 'InProgress', 'Completed', or 'Error'.
 *
 * - `community`: An object detailing the community associated with the platform:
 *    - `logo`: A string URL pointing to the community's logo.
 *    - `name`: The name of the community.
 *
 * @component
 * @example
 * <TcConnectedPlatformsItem
 *   icon={<SomeIcon />}
 *   platformTitle="Some Platform"
 *   status={PlatformStatus.Completed}
 *   community={{
 *     logo: 'https://example.com/logo.png',
 *     name: 'Example Community'
 *   }}
 * />
 */

import React from 'react';
import TcText from '../../shared/TcText';
import { PlatformStatus } from '../../../utils/enums';
import clsx from 'clsx';
import TcAvatar from '../../shared/TcAvatar';
import TcIntegrationCard from '../TcIntegrationCard';
import router from 'next/router';

interface ICommunityInfo {
  logo: string;
  name: string;
}

interface ITcConnectedPlatformsItemProps {
  icon: React.ReactElement | JSX.Element;
  platformTitle: string;
  status: PlatformStatus;
  community: ICommunityInfo;
}

function TcConnectedPlatformsItem({
  icon,
  platformTitle,
  status,
  community,
}: ITcConnectedPlatformsItemProps) {
  return (
    <TcIntegrationCard
      sx={{
        ':hover': {
          backgroundColor: (theme) => theme.palette.grey[100],
          cursor: 'pointer',
        },
      }}
      onClick={() => router.push('/community-settings/platform/2/')}
    >
      <div className="text-center p-4 space-y-7">
        <div className="space-y-2">
          <div className="flex justify-center items-center space-x-1">
            <TcText text={platformTitle} variant="body1" />
            <div
              className={clsx('h-3 w-3 rounded-full', {
                'bg-success': status === PlatformStatus.Completed,
                'bg-warning-500': status === PlatformStatus.InProgress,
                'bg-error': status === PlatformStatus.Error,
              })}
            />
          </div>
          <div className="flex justify-center">{icon}</div>
        </div>
        {community && (
          <div className="flex items-center space-x-2">
            <TcAvatar src={community.logo} sx={{ width: 20, height: 20 }} />
            <TcText text={community.name} variant="caption" />
          </div>
        )}
      </div>
    </TcIntegrationCard>
  );
}

export default TcConnectedPlatformsItem;
