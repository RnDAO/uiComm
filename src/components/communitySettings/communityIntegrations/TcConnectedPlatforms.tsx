import React from 'react';
import TcConnectedPlatformsItem from './TcConnectedPlatformsItem';
import { BsDiscord } from 'react-icons/bs';
import { PlatformStatus } from '../../../utils/enums';

const mockData = [
  {
    icon: <BsDiscord size={34} />,
    platformTitle: 'Discord',
    status: PlatformStatus.InProgress,
    community: {
      logo: '',
      name: 'Togethercrew',
    },
  },
];

function TcConnectedPlatforms() {
  return (
    <div className="flex flex-row space-x-5">
      {mockData.map((item, index) => (
        <TcConnectedPlatformsItem
          key={index}
          icon={item.icon}
          platformTitle={item.platformTitle}
          status={item.status}
          community={item.community}
        />
      ))}
    </div>
  );
}

export default TcConnectedPlatforms;
