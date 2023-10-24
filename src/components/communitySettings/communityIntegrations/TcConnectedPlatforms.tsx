import React, { useEffect, useState } from 'react';
import TcConnectedPlatformsItem from './TcConnectedPlatformsItem';
import { BsDiscord } from 'react-icons/bs';
import { PlatformStatus } from '../../../utils/enums';
import { FetchedData, IPlatformProps } from '../../../utils/interfaces';
import useAppStore from '../../../store/useStore';

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
  const { retrievePlatforms, connectedPlatforms } = useAppStore();
  const [fetchedPlatforms, setFetchedPlatforms] = useState<FetchedData>({
    limit: 10,
    page: 1,
    results: [],
    totalPages: 0,
    totalResults: 0,
  });

  useEffect(() => {
    const { data } = retrievePlatforms({ page: 1, limit: 10 });
    setFetchedPlatforms(data);
  }, []);

  return (
    <div className="flex flex-row space-x-5">
      {connectedPlatforms.map((platform: IPlatformProps, index: number) => (
        <TcConnectedPlatformsItem
          key={index}
          icon={platform.icon}
          platformTitle={platform.platformTitle}
          status={platform.status}
          community={platform.community}
        />
      ))}
    </div>
  );
}

export default TcConnectedPlatforms;
