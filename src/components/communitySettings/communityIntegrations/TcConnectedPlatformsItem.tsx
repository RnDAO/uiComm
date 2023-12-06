/**
 * TcConnectedPlatformsItem Component
 *
 * This component displays detailed information about a specific platform connected to a community.
 * It includes the platform's name, connection status, and related community details.
 *
 * Props:
 * - `platform` (IPlatformProps): An object containing the platform's details, including:
 *    - `name`: The name of the platform.
 *    - `community`: The name of the associated community.
 *    - `isInProgress`: Boolean indicating the connection status of the platform.
 *    - `connectedAt`: Date string representing when the platform was connected.
 *    - `id`: The unique identifier of the platform.
 *    - `disconnectedAt`: Date string or null, indicating when the platform was disconnected, if applicable.
 *    - `metadata`: An object containing additional metadata about the platform.
 *
 * The component visually represents the platform with an icon, the platform's name, and the community's information.
 * It also provides a menu for additional actions, represented by a 'three dots' icon.
 *
 * @component
 * @example
 * const platform = {
 *   name: 'Discord',
 *   community: 'Example Community',
 *   isInProgress: false,
 *   connectedAt: '2021-01-01',
 *   id: '1',
 *   disconnectedAt: null,
 *   metadata: {
 *     profileImageUrl: 'https://example.com/image.png',
 *     name: 'Example Community',
 *     username: 'exampleuser',
 *     icon: 'icon-id'
 *   }
 * };
 *
 * <TcConnectedPlatformsItem platform={platform} />
 */

import React, { useState } from 'react';
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
import { ClickAwayListener, Tooltip } from '@mui/material';

interface TcConnectedPlatformsItemProps {
  platform: IPlatformProps;
}

function TcConnectedPlatformsItem({ platform }: TcConnectedPlatformsItemProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
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
              <ClickAwayListener onClickAway={handleTooltipClose}>
                <Tooltip
                  title={'Connected'}
                  arrow
                  placement="right"
                  enterTouchDelay={0}
                >
                  <div
                    onClick={handleTooltipOpen}
                    className={'h-3 w-3 rounded-full bg-success'}
                  />
                </Tooltip>
              </ClickAwayListener>
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
