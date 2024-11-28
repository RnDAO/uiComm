import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { BsPlus } from 'react-icons/bs';

import TcCommunityList from './TcCommunityList';
import Loading from '../../global/Loading';
import SimpleBackdrop from '../../global/LoadingBackdrop';
import TcBoxContainer from '../../shared/TcBox/TcBoxContainer';
import TcButton from '../../shared/TcButton';
import TcInput from '../../shared/TcInput';
import TcText from '../../shared/TcText';
import { useToken } from '../../../context/TokenContext';
import { debounce } from '../../../helpers/helper';
import { StorageService } from '../../../services/StorageService';
import useAppStore from '../../../store/useStore';
import { IDiscordModifiedCommunity } from '../../../utils/interfaces';

export interface CommunityData {
  limit: number;
  page: number;
  results: any[];
  totalPages: number;
  totalResults: number;
}

function TcSelectCommunity() {
  const { retrieveCommunities } = useAppStore();

  const { updateCommunity } = useToken();

  const [loading, setLoading] = useState<boolean>(false);
  const [communityLoading, setCommunityLoading] = useState<boolean>(false);
  const [activeCommunity, setActiveCommunity] =
    useState<IDiscordModifiedCommunity>();
  const [fetchedCommunities, setFetchedCommunities] = useState<CommunityData>({
    limit: 10,
    page: 1,
    results: [],
    totalPages: 0,
    totalResults: 0,
  });

  const fetchCommunities = async (params: any) => {
    setLoading(true);
    const communities = await retrieveCommunities(params);
    setFetchedCommunities(communities);
    setLoading(false);
  };

  const debouncedFetchCommunities = debounce((value: string) => {
    fetchCommunities({ page: 1, limit: 10, name: value });
  }, 300);

  useEffect(() => {
    fetchCommunities({ page: 1, limit: 10 });
  }, []);

  const handleSelectedCommunity = () => {
    setCommunityLoading(true);
    if (activeCommunity) {
      updateCommunity(activeCommunity);
      StorageService.writeLocalStorage<IDiscordModifiedCommunity>(
        'community',
        activeCommunity
      );
      router.push('/');
    }
  };

  if (communityLoading) {
    return <SimpleBackdrop />;
  }

  return (
    <div className='space-y-4' data-testid='tcselect-community'>
      <TcText
        text='Select your community'
        sx={{ typography: { xs: 'h5', md: 'h4' } }}
      />
      <TcText
        text='You will be able to switch between the communities later'
        variant='body1'
      />

      <TcBoxContainer
        contentContainerChildren={
          <>
            <div className='sticky top-0 z-10 bg-white py-2'>
              <TcInput
                label='Community'
                variant='filled'
                placeholder='Write community name'
                onChange={(e) => debouncedFetchCommunities(e.target.value)}
              />
            </div>
            {loading ? (
              <Loading />
            ) : (
              <TcCommunityList
                fetchedCommunities={fetchedCommunities}
                handleActiveCommunity={(community: IDiscordModifiedCommunity) =>
                  setActiveCommunity(community)
                }
              />
            )}
          </>
        }
        className='border-custom-gray mx-auto max-h-[25rem] min-h-[20rem] overflow-y-scroll rounded-lg border md:w-3/5'
      />

      <TcButton
        text='Continue'
        className='secondary'
        variant='contained'
        sx={{ width: '15rem', padding: '0.5rem' }}
        disabled={!activeCommunity}
        onClick={handleSelectedCommunity}
      />

      <hr className='mx-auto w-6/12' />

      <TcText
        text='Create a new community account'
        sx={{ typography: { xs: 'body1', md: 'h6' } }}
      />
      <TcButton
        startIcon={<BsPlus />}
        text='Create'
        sx={{ width: '15rem', padding: '0.5rem' }}
        variant='outlined'
        onClick={() => router.push('/centric/create-new-community')}
      />
    </div>
  );
}

export default TcSelectCommunity;
