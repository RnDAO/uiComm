import React from 'react';
import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';
import Fragmentation from '../components/pages/communityHealth/Fragmentation';
import Decentralization from '../components/pages/communityHealth/Decentralization';
import HeaderSection from '../components/pages/communityHealth/HeaderSection';

function communityHealth() {
  return (
    <>
      <SEO titleTemplate="Community Health" />
      <div className="flex flex-col container justify-between px-4 md:px-12 py-3 space-y-4">
        <HeaderSection />
        <h3 className="pb-6 pt-4 text-lg font-medium text-lite-black">
          Community Health
        </h3>
        <Fragmentation />
        <Decentralization />
      </div>
    </>
  );
}

communityHealth.pageLayout = defaultLayout;

export default communityHealth;
