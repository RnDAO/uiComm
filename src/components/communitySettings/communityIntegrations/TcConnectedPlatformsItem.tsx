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
 *   It's a boolean value true or false.
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
 *   status={true or false}
 *   community={{
 *     logo: 'https://example.com/logo.png',
 *     name: 'Example Community'
 *   }}
 * />
 */

import React from 'react';
import TcText from '../../shared/TcText';
import clsx from 'clsx';
import TcAvatar from '../../shared/TcAvatar';
import TcIntegrationCard from '../TcIntegrationCard';
import router from 'next/router';
import { conf } from '../../../configs';
import { IPlatformProps } from '../../../utils/interfaces';
import TcIntegrationIcon from './TcIntegrationIcon';
import { capitalizeFirstChar, truncateCenter } from '../../../helpers/helper';
import { IntegrationPlatform } from '../../../utils/enums';
import { BsThreeDots } from 'react-icons/bs';
import { Tooltip } from '@mui/material';

interface TcConnectedPlatformsItemProps {
  platform: IPlatformProps;
}

function TcConnectedPlatformsItem({ platform }: TcConnectedPlatformsItemProps) {
  return (
    <TcIntegrationCard>
      <>
        <div className="flex justify-end p-1.5">
          <BsThreeDots
            className="cursor-pointer text-gray-400"
            onClick={() =>
              router.push(`/community-settings/platform/${platform.id}/`)
            }
          />
        </div>
        <div className="text-center px-3 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-center items-center space-x-1">
              <TcText
                text={capitalizeFirstChar(platform.name)}
                variant="body1"
                className="text-semibold"
              />
              <Tooltip title={'Connected'} arrow placement="right">
                <div className={'h-3 w-3 rounded-full bg-success'} />
              </Tooltip>
            </div>
            <div className="flex justify-center">
              <TcIntegrationIcon
                platform={
                  capitalizeFirstChar(platform.name) as IntegrationPlatform
                }
                size={35}
              />
            </div>
          </div>
          {platform && (
            <div className={clsx('flex items-center space-x-2 justify-center')}>
              <TcAvatar
                src={
                  platform.metadata.profileImageUrl
                    ? platform.metadata.profileImageUrl
                    : `${conf.DISCORD_CDN}icons/${platform.metadata.id}/${platform?.metadata.icon}.png`
                }
                alt="User Avatar"
                sx={{ width: 25, height: 25 }}
              />
              <TcText
                text={truncateCenter(
                  platform.metadata.name
                    ? platform.metadata.name
                    : platform.metadata.username,
                  15
                )}
                variant="caption"
              />
            </div>
          )}
        </div>
      </>
    </TcIntegrationCard>
  );
}

export default TcConnectedPlatformsItem;
