import React from 'react';
import TcCommunityListItems from './TcCommunityListItems';

function TcCommunityList({ fetchedCommunities }: any) {
  return <TcCommunityListItems communities={fetchedCommunities.results} />;
}

export default TcCommunityList;
