import React, { useEffect, useState } from 'react';
import TcAvatar from '../../shared/TcAvatar';
import TcText from '../../shared/TcText';
import { ICommunity } from '../../../utils/interfaces';
import clsx from 'clsx';

/**
 * Props for the TcCommunityListItems component.
 */
interface ITcCommunityListItemsProps {
  /**
   * Array of community objects with avatar URLs and labels.
   */
  communities: ICommunity[];
  onSelectCommunity: (selectedCommunity: ICommunity) => void;
}

/**
 * Renders a list of community items.
 *
 * Each item in the list displays an avatar and a label.
 * The component ensures that items are displayed with a hover effect and
 * a consistent layout across various screen sizes.
 *
 * @param communities - An array of community data with avatar and label properties.
 * @returns A JSX element containing the list of community items.
 */
function TcCommunityListItems({
  communities,
  onSelectCommunity,
}: ITcCommunityListItemsProps) {
  const [selectedCommunity, setSelectedCommunity] = useState<ICommunity>();

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
    <div className="flex justify-between flex-wrap mt-8">
      {communities.map((community, index) => (
        <div
          className={clsx(
            selectedCommunity?.id === community.id ? 'bg-gray-50' : '',
            'w-1/2 md:w-1/4 flex-grow rounded text-center px-8 py-4 cursor-pointer space-y-2 hover:bg-gray-100 transition-all delay-75 ease-in'
          )}
          key={community.name + index}
          onClick={() => setSelectedCommunity(community)}
        >
          <TcAvatar className="mx-auto" src={community.avatarURL} />
          <TcText text={community.name} variant={'body1'} />
        </div>
      ))}
    </div>
  );
}

export default TcCommunityListItems;
