import React, { useEffect, useState } from 'react';
import TcCommunityListItems from './TcCommunityListItems';
import { ICommunity } from '../../../utils/interfaces';

function TcCommunityList({ fetchedCommunities, handleActiveCommunity }: any) {
  const [activeCommunity, setActiveCommunity] = useState<ICommunity>();
  const handleSelectedCommunity = (community: ICommunity) => {
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
