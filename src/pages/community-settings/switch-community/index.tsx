import React, { useEffect, useState } from 'react';
import { defaultLayout } from '../../../layouts/defaultLayout';
import SEO from '../../../components/global/SEO';
import TcBoxContainer from '../../../components/shared/TcBox/TcBoxContainer';
import router from 'next/router';
import { BsPlus } from 'react-icons/bs';
import TcCommunityList from '../../../components/centric/selectCommunity/TcCommunityList';
import Loading from '../../../components/global/Loading';
import TcButton from '../../../components/shared/TcButton';
import TcInput from '../../../components/shared/TcInput';
import TcText from '../../../components/shared/TcText';
import { ICommunity } from '../../../utils/interfaces';
import { debounce } from '@mui/material';
import { StorageService } from '../../../services/StorageService';
import useAppStore from '../../../store/useStore';
import { CommunityData } from '../../../components/centric/selectCommunity/TcSelectCommunity';
import { useToken } from '../../../context/TokenContext';

function Index() {
  const { updateCommunity } = useToken();

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
    if (activeCommunity) {
      updateCommunity(activeCommunity);
    }
    router.push('/community-settings');
  };

  return (
    <>
      <SEO titleTemplate="Community Settings" />
      <div className="flex flex-col container px-4 md:px-12 py-4">
        <TcBoxContainer
          contentContainerChildren={
            <div className="flex flex-col text-center justify-between p-4  md:pb-12 md:pt-6 space-y-4 min-h-[90vh]">
              <div className="space-y-5">
                <TcText
                  text="Select your community"
                  sx={{ typography: { xs: 'h5', md: 'h5' } }}
                />
                <TcBoxContainer
                  contentContainerChildren={
                    <>
                      <div className="sticky top-0 z-10 bg-white py-2">
                        <TcInput
                          label="Community"
                          variant="filled"
                          placeholder="Write community name"
                          onChange={(e) =>
                            debouncedFetchCommunities(e.target.value)
                          }
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
                  className="md:w-3/6 mx-auto border border-custom-gray min-h-[20rem] max-h-[25rem] overflow-y-scroll rounded-lg"
                />
                <TcText
                  sx={{ typography: { xs: 'caption', md: 'subtitle2' } }}
                  text={
                    <>
                      Can't see your community?{' '}
                      <a
                        href="/community-settings"
                        className="text-secondary font-bold"
                      >
                        Connect with the identifier
                      </a>{' '}
                      that was used to grant you access.
                    </>
                  }
                />
                <div className="py-8">
                  <TcButton
                    text="Save Changes"
                    className="secondary"
                    variant="contained"
                    disabled={!activeCommunity}
                    onClick={handleSelectedCommunity}
                  />
                </div>
                <div className="mx-auto space-y-5">
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
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}

Index.pageLayout = defaultLayout;

export default Index;
