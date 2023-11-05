import React, { useEffect, useState } from 'react';
import TcConnectedPlatforms from './TcConnectedPlatforms';
import TcAvailableIntegrations from './TcAvailableIntegrations';
import TcText from '../../shared/TcText';
import useAppStore from '../../../store/useStore';
import { FetchedData } from '../../../utils/interfaces';

function TcCommunityIntegrations() {
  const { retrievePlatforms } = useAppStore();
  const [fetchedPlatforms, setFetchedPlatforms] = useState<FetchedData>({
    limit: 10,
    page: 1,
    results: [],
    totalPages: 0,
    totalResults: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await retrievePlatforms({ page: 1, limit: 10 });

        setFetchedPlatforms(data);
      } catch (error) {
        console.error('An error occurred while fetching platforms:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <TcText text="Integration" variant={'h6'} />
      <div className="space-y-5">
        {fetchedPlatforms?.results ? (
          <div className="space-y-4 md:mb-8">
            <TcText
              text="Platforms currently connected to your community account"
              variant="body2"
            />
            <TcConnectedPlatforms
              connectedPlatforms={fetchedPlatforms?.results}
            />
          </div>
        ) : (
          ''
        )}

        <div className="space-y-4">
          <TcText
            text="Chose the platforms you want to connect with your community account"
            variant="body2"
          />
          <TcAvailableIntegrations />
        </div>
      </div>
    </>
  );
}

export default TcCommunityIntegrations;
