import React, { useEffect, useState } from 'react';

import TcCommunityListItems from './TcCommunityListItems';
import { IDiscordModifiedCommunity } from '../../../utils/interfaces';

function TcCommunityList({ fetchedCommunities, handleActiveCommunity }: any) {
  const [activeCommunity, setActiveCommunity] =
    useState<IDiscordModifiedCommunity>();
  const handleSelectedCommunity = (community: IDiscordModifiedCommunity) => {
    setActiveCommunity(community);
  };

  useEffect(() => {
    handleActiveCommunity(activeCommunity);
  }, [activeCommunity]);

  return (
    <TcCommunityListItems
      communities={fetchedCommunities.results}
      onSelectCommunity={handleSelectedCommunity}
    />
  );
}

export default TcCommunityList;
