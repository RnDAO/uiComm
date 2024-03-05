import React, { useEffect, useState } from 'react';
import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';
import Fragmentation from '../components/pages/communityHealth/Fragmentation';
import Decentralization from '../components/pages/communityHealth/Decentralization';
import HeaderSection from '../components/pages/communityHealth/HeaderSection';
import useAppStore from '../store/useStore';
import SimpleBackdrop from '../components/global/LoadingBackdrop';
import {
  IDecentralisationScoreResponse,
  IFragmentationScoreResponse,
} from '../utils/interfaces';
import { useToken } from '../context/TokenContext';

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
      <SEO titleTemplate="Community Health" />
      <div className="flex flex-col container justify-between px-4 md:px-12 py-3 space-y-4">
        <HeaderSection />
        <h3 className="pb-6 pt-4 text-lg font-medium text-lite-black">
          Community Health
        </h3>
        <Fragmentation scoreData={fragmentationScoreData} />
        <Decentralization scoreData={decentralisationScoreData} />
      </div>
    </>
  );
}

CommunityHealth.pageLayout = defaultLayout;

export default CommunityHealth;
