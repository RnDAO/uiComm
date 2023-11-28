import React, { useEffect, useState } from 'react';
import TcConnectedPlatforms from './TcConnectedPlatforms';
import TcAvailableIntegrations from './TcAvailableIntegrations';
import TcText from '../../shared/TcText';
import useAppStore from '../../../store/useStore';
import { FetchedData, ICommunity } from '../../../utils/interfaces';
import { StorageService } from '../../../services/StorageService';
import Loading from '../../global/Loading';

function TcCommunityIntegrations() {
  const { retrievePlatforms } = useAppStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchedPlatforms, setFetchedPlatforms] = useState<FetchedData>({
    limit: 10,
    page: 1,
    results: [],
    totalPages: 0,
    totalResults: 0,
  });

  useEffect(() => {
    const communityId =
      StorageService.readLocalStorage<ICommunity>('community')?.id;
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await retrievePlatforms({
          page: 1,
          limit: 10,
          community: communityId,
        });

        setFetchedPlatforms(data);
        setLoading(false);
      } catch (error) {
        console.error('An error occurred while fetching platforms:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <TcText text="Integration" variant={'h6'} />
      <div className="space-y-5">
        {fetchedPlatforms?.results.length > 0 ? (
          <div className="space-y-4 md:mb-8">
            {loading ? (
              <Loading height="10rem" />
            ) : (
              <>
                <TcText
                  text="Platforms currently connected to your community account"
                  variant="body2"
                />
                <TcConnectedPlatforms
                  connectedPlatforms={fetchedPlatforms?.results}
                />
              </>
            )}
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
