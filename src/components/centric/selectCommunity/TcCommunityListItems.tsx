import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdGroups } from 'react-icons/md';

import TcAvatar from '../../shared/TcAvatar';
import TcText from '../../shared/TcText';
import { conf } from '../../../configs';
import { StorageService } from '../../../services/StorageService';
import { IDiscordModifiedCommunity } from '../../../utils/interfaces';

/**
 * Props for the TcCommunityListItems component.
 */
interface ITcCommunityListItemsProps {
  /**
   * Array of community objects with avatar URLs and labels.
   */
  communities: IDiscordModifiedCommunity[];
  onSelectCommunity: (selectedCommunity: IDiscordModifiedCommunity) => void;
}

/**
 * TcCommunityListItems Component
 *
 * Renders a list of community items, each displaying an avatar and a label.
 * Features include:
 * - Reading the currently selected community from local storage on initial render.
 * - Updating the selected community both internally and via `onSelectCommunity` callback when a community is clicked.
 * - Responsive layout for different screen sizes.
 * - Displaying a message when there are no communities.
 *
 * Props:
 * - communities (IDiscordModifiedCommunity[]): Array of community objects with `avatarURL` and `name`.
 * - onSelectCommunity (Function): Callback when a community is selected.
 *
 * Usage:
 * <TcCommunityListItems
 *   communities={[{ id: 1, name: 'Community 1', avatarURL: 'url1' }]}
 *   onSelectCommunity={handleSelect}
 * />
 */

function TcCommunityListItems({
  communities,
  onSelectCommunity,
}: ITcCommunityListItemsProps) {
  const [selectedCommunity, setSelectedCommunity] =
    useState<IDiscordModifiedCommunity>();

  useEffect(() => {
    const community =
      StorageService.readLocalStorage<IDiscordModifiedCommunity>('community');
    setSelectedCommunity(community);
  }, []);

  useEffect(() => {
    if (selectedCommunity) {
      onSelectCommunity(selectedCommunity);
    }
  }, [selectedCommunity]);

  const renderPlatformAvatar = (community: IDiscordModifiedCommunity) => {
    let activeCommunityPlatformIcon;

    if (community?.platforms) {
      activeCommunityPlatformIcon = community.platforms.find(
        (platform) => platform.disconnectedAt === null
      );
    }

    if (
      activeCommunityPlatformIcon &&
      activeCommunityPlatformIcon.metadata &&
      activeCommunityPlatformIcon.metadata.icon
    ) {
      return (
        <Image
          src={`${conf.DISCORD_CDN}icons/${activeCommunityPlatformIcon.metadata.id}/${activeCommunityPlatformIcon.metadata.icon}`}
          width='100'
          height='100'
          alt={activeCommunityPlatformIcon.metadata.name || ''}
          className='rounded-full'
        />
      );
    }

    return <MdGroups size={28} />;
  };

  if (communities.length === 0) {
    return (
      <div className='py-8'>
        <TcText text='No community exist' variant='body1' color='gray' />
      </div>
    );
  }

  return (
    <div className='mx-2 mt-8 flex flex-wrap justify-start'>
      {communities.map((community, index) => (
        <div
          className={clsx(
            selectedCommunity?.id === community.id ? 'bg-gray-100' : '',
            'min-h-[150px] w-1/2 flex-shrink-0 cursor-pointer space-y-2 rounded px-8 py-4 text-center transition-all delay-75 ease-in hover:bg-gray-100 md:w-1/4'
          )}
          key={community.name + index}
          onClick={() => setSelectedCommunity(community)}
        >
          {community?.avatarURL ? (
            <TcAvatar className='mx-auto' src={community.avatarURL} />
          ) : (
            <TcAvatar className='mx-auto'>
              {renderPlatformAvatar(community)}
            </TcAvatar>
          )}
          <TcText text={community.name} variant='body1' />
        </div>
      ))}
    </div>
  );
}

export default TcCommunityListItems;
