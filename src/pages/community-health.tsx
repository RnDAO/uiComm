import React, { useEffect, useState } from 'react';

import SimpleBackdrop from '../components/global/LoadingBackdrop';
import SEO from '../components/global/SEO';
import Decentralization from '../components/pages/communityHealth/Decentralization';
import Fragmentation from '../components/pages/communityHealth/Fragmentation';
import HeaderSection from '../components/pages/communityHealth/HeaderSection';
import { useToken } from '../context/TokenContext';
import { defaultLayout } from '../layouts/defaultLayout';
import useAppStore from '../store/useStore';
import {
  IDecentralisationScoreResponse,
  IFragmentationScoreResponse,
} from '../utils/interfaces';
import { withRoles } from './withRoles';

function CommunityHealth() {
  const { community } = useToken();
  const { getDecentralisation, getFragmentation, isLoading } = useAppStore();
  const [decentralisationScoreData, setDecentralisationScoreData] =
    useState<IDecentralisationScoreResponse | null>(null);
  const [fragmentationScoreData, setFragmentationScoreData] =
    useState<IFragmentationScoreResponse | null>(null);

  useEffect(() => {
    const platformId = community?.platforms.find(
      (platform) => platform.disconnectedAt === null
    )?.id;

    if (platformId) {
      Promise.all([
        getDecentralisation(platformId),
        getFragmentation(platformId),
      ]).then(([decentralisationRes, fragmentationRes]) => {
        setDecentralisationScoreData(decentralisationRes);
        setFragmentationScoreData(fragmentationRes);
      });
    }
  }, [getDecentralisation, getFragmentation]);

  if (isLoading) {
    return <SimpleBackdrop />;
  }

  return (
    <>
      <SEO titleTemplate='Community Health' />
      <div className='container flex flex-col justify-between space-y-4 px-4 py-3 md:px-12'>
        <HeaderSection />
        <h3 className='pb-6 pt-4 text-lg font-medium text-lite-black'>
          Community Health
        </h3>
        <Fragmentation scoreData={fragmentationScoreData} />
        <Decentralization scoreData={decentralisationScoreData} />
      </div>
    </>
  );
}

CommunityHealth.pageLayout = defaultLayout;

export default withRoles(CommunityHealth, ['view', 'admin']);
