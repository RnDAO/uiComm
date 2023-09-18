import React from 'react';
import TcCommunityListItems from './TcCommunityListItems';

const TcCommunityMockList = [
  {
    avatar: 'path_to_avatar_for_test1',
    label: 'Community 1',
  },
  {
    avatar: 'path_to_avatar_for_test2',
    label: 'Community 2',
  },
  {
    avatar: 'path_to_avatar_for_test3',
    label: 'Community 3',
  },
  {
    avatar: 'path_to_avatar_for_test4',
    label: 'Community 4',
  },
  {
    avatar: 'path_to_avatar_for_test5',
    label: 'Community 5',
  },
  {
    avatar: 'path_to_avatar_for_test6',
    label: 'Community 6',
  },
  {
    avatar: 'path_to_avatar_for_test7',
    label: 'Community 7',
  },
  {
    avatar: 'path_to_avatar_for_test8',
    label: 'Community 8',
  },
  {
    avatar: 'path_to_avatar_for_test9',
    label: 'Community 9',
  },
  {
    avatar: 'path_to_avatar_for_test10',
    label: 'Community 10',
  },
  {
    avatar: 'path_to_avatar_for_test11',
    label: 'Community 11',
  },
  {
    avatar: 'path_to_avatar_for_test12',
    label: 'Community 12',
  },
  {
    avatar: 'path_to_avatar_for_test13',
    label: 'Community 13',
  },
  {
    avatar: 'path_to_avatar_for_test14',
    label: 'Community 14',
  },
  {
    avatar: 'path_to_avatar_for_test15',
    label: 'Community 15',
  },
];

function TcCommunityList() {
  return <TcCommunityListItems communities={TcCommunityMockList} />;
}

export default TcCommunityList;
