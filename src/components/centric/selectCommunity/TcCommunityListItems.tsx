import React, { useEffect, useState } from 'react';
import TcAvatar from '../../shared/TcAvatar';
import TcText from '../../shared/TcText';
import { IDiscordModifiedCommunity } from '../../../utils/interfaces';
import clsx from 'clsx';
import { StorageService } from '../../../services/StorageService';
import { MdGroups } from 'react-icons/md';

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

  if (communities.length === 0) {
    return (
      <div className="py-8">
        <TcText text="No community exist" variant={'body1'} color="gray" />
      </div>
    );
  }

  return (
    <div className="flex justify-start flex-wrap mt-8 mx-2">
      {communities.map((community, index) => (
        <div
          className={clsx(
            selectedCommunity?.id === community.id ? 'bg-gray-100' : '',
            'flex-shrink-0 w-1/2 md:w-1/4 min-h-[150px] rounded text-center px-8 py-4 cursor-pointer space-y-2 hover:bg-gray-100 transition-all delay-75 ease-in'
          )}
          key={community.name + index}
          onClick={() => setSelectedCommunity(community)}
        >
          {community?.avatarURL ? (
            <TcAvatar className="mx-auto" src={community.avatarURL} />
          ) : (
            <TcAvatar className="mx-auto">
              <MdGroups size={28} />
            </TcAvatar>
          )}
          <TcText text={community.name} variant={'body1'} />
        </div>
      ))}
    </div>
  );
}

export default TcCommunityListItems;
