import React, { useEffect, useState } from 'react';
import TcText from '../../shared/TcText';
import TcBoxContainer from '../../shared/TcBox/TcBoxContainer';
import TcInput from '../../shared/TcInput';
import TcCommunityList from './TcCommunityList';
import TcButton from '../../shared/TcButton';
import { BsPlus } from 'react-icons/bs';
import router from 'next/router';
import useAppStore from '../../../store/useStore';
import Loading from '../../global/Loading';
import { debounce } from '../../../helpers/helper';
import { ICommunity } from '../../../utils/interfaces';
import { StorageService } from '../../../services/StorageService';
import SimpleBackdrop from '../../global/LoadingBackdrop';

interface CommunityData {
  limit: number;
  page: number;
  results: any[];
  totalPages: number;
  totalResults: number;
}

function TcSelectCommunity() {
  const { retrieveCommunities } = useAppStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [communityLoading, setCommunityLoading] = useState<boolean>(false);
  const [activeCommunity, setActiveCommunity] = useState<ICommunity>();
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
    StorageService.writeLocalStorage('community', activeCommunity);
    router.push('/');
  };

  if (communityLoading) {
    return <SimpleBackdrop />;
  }

  return (
    <div className="space-y-4" data-testid="tcselect-community">
      <TcText
        text="Select your community"
        sx={{ typography: { xs: 'h5', md: 'h4' } }}
      />
      <TcText
        text="You will be able to switch between the communities later"
        variant="body1"
      />

      <TcBoxContainer
        contentContainerChildren={
          <>
            <div className="sticky top-0 z-10 bg-white py-2">
              <TcInput
                label="Community"
                variant="filled"
                placeholder="Write community name"
                onChange={(e) => debouncedFetchCommunities(e.target.value)}
              />
            </div>
            {loading ? (
              <Loading />
            ) : (
              <TcCommunityList
                fetchedCommunities={fetchedCommunities}
                handleActiveCommunity={(community: ICommunity) =>
                  setActiveCommunity(community)
                }
              />
            )}
          </>
        }
        className="md:w-3/5 mx-auto border border-custom-gray min-h-[20rem] max-h-[25rem] overflow-y-scroll rounded-lg"
      />

      <TcButton
        text="Continue"
        className="secondary"
        variant="contained"
        onClick={handleSelectedCommunity}
      />

      <hr className="w-6/12 mx-auto" />

      <TcText
        text="Create a new community account"
        sx={{ typography: { xs: 'body1', md: 'h6' } }}
      />
      <TcButton
        startIcon={<BsPlus />}
        text="Create"
        variant="outlined"
        onClick={() => router.push('/centric/create-new-community')}
      />
    </div>
  );
}

export default TcSelectCommunity;
