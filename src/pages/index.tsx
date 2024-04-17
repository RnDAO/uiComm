import Image from 'next/image';
import React from 'react';

import emptyState from '../assets/svg/empty-state.svg';
import EmptyState from '../components/global/EmptyState';
import SEO from '../components/global/SEO';
import ActiveMemberComposition from '../components/pages/pageIndex/ActiveMemberComposition';
import HeatmapChart from '../components/pages/pageIndex/HeatmapChart';
import MemberInteractionGraph from '../components/pages/pageIndex/MemberInteractionGraph';
import { useToken } from '../context/TokenContext';
import { defaultLayout } from '../layouts/defaultLayout';
import { withRoles } from '../utils/withRoles';

function Index(): JSX.Element {
  const { community } = useToken();

  if (!community || community?.platforms?.length === 0) {
    return (
      <>
        <SEO />
        <EmptyState image={<Image alt='Image Alt' src={emptyState} />} />
      </>
    );
  }

  return (
    <>
      <SEO />
      <div className='container flex flex-col justify-between space-y-8 px-4 py-4 md:px-12'>
        <div className='block'>
          <h3 className='pb-6 text-lg font-medium text-lite-black'>
            Community Insights
          </h3>
          <div className='space-y-4'>
            <ActiveMemberComposition />
            <HeatmapChart />
            <MemberInteractionGraph />
          </div>
        </div>
      </div>
    </>
  );
}

Index.pageLayout = defaultLayout;

export default withRoles(Index, ['view', 'admin']);
