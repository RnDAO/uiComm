import React, { useEffect, useState } from 'react';
import TcConnectedPlatformsItem from './TcConnectedPlatformsItem';
import { FetchedData, IPlatformProps } from '../../../utils/interfaces';
import useAppStore from '../../../store/useStore';

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
        <TcConnectedPlatformsItem key={index} platform={platform} />
      ))}
    </div>
  );
}

export default TcConnectedPlatforms;
