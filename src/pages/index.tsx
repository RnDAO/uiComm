import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';
import { useState } from 'react';
import { StorageService } from '../services/StorageService';
import EmptyState from '../components/global/EmptyState';
import Image from 'next/image';
import emptyState from '../assets/svg/empty-state.svg';
import React from 'react';
import ActiveMemberComposition from '../components/pages/pageIndex/ActiveMemberComposition';
import HeatmapChart from '../components/pages/pageIndex/HeatmapChart';
import MemberInteractionGraph from '../components/pages/pageIndex/MemberInteractionGraph';
import { ChannelProvider } from '../context/ChannelContext';
import { useToken } from '../context/TokenContext';

function Dashboard(): JSX.Element {
  const [alertStateOpen, setAlertStateOpen] = useState(false);
  const { community } = useToken();

  const toggleAnalysisState = () => {
    StorageService.writeLocalStorage('analysis_state', {
      isRead: true,
      visible: false,
    });
    setAlertStateOpen(false);
  };

  if (!community || community.platforms.length === 0) {
    return (
      <>
        <SEO />
        <EmptyState image={<Image alt="Image Alt" src={emptyState} />} />
      </>
    );
  }

  return (
    <>
      <SEO />
      <ChannelProvider>
        <div className="flex flex-col container space-y-8 justify-between px-4 md:px-12 py-4">
          <div className="block">
            <h3 className="pb-6 text-lg font-medium text-lite-black">
              Community Insights
            </h3>
            <div className="space-y-4">
              <ActiveMemberComposition />
              <HeatmapChart />
              <MemberInteractionGraph />
            </div>
          </div>
        </div>
      </ChannelProvider>
    </>
  );
}

Dashboard.pageLayout = defaultLayout;

export default Dashboard;
