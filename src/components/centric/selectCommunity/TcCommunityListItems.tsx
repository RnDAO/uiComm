import React from 'react';
import TcAvatar from '../../shared/TcAvatar';
import TcText from '../../shared/TcText';

/**
 * Props for the TcCommunityListItems component.
 */
interface ITcCommunityListItemsProps {
  /**
   * Array of community objects with avatar URLs and labels.
   */
  communities: { avatar: string; label: string }[];
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
function TcCommunityListItems({ communities }: ITcCommunityListItemsProps) {
  return (
    <div className="flex justify-between flex-wrap mt-8">
      {communities.map((community) => (
        <div
          className="w-1/2 md:w-1/4 flex-grow rounded text-center px-8 py-4 cursor-pointer space-y-2 hover:bg-gray-100 transition-all delay-75 ease-in"
          key={community.label}
        >
          <TcAvatar className="mx-auto" src={community.avatar} />
          <TcText text={community.label} variant={'body1'} />
        </div>
      ))}
    </div>
  );
}

export default TcCommunityListItems;
