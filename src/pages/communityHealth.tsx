import React from 'react';
import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';
import { Paper } from '@mui/material';
import Fragmentation from '../components/pages/communityHealth/Fragmentation';

function communityHealth() {
  return (
    <>
      <SEO titleTemplate="Community Health" />
      <div className="flex flex-col container justify-between px-4 md:px-12 py-3">
        <h3 className="pb-6 text-lg font-medium text-lite-black">
          Community Health
        </h3>
        <Paper className="px-4 md:px-8 py-6 rounded-xl shadow-box space-y-4">
          <h3 className="text-lg font-medium text-lite-black">Fragmentation</h3>
          <Fragmentation />
        </Paper>
      </div>
    </>
  );
}

communityHealth.pageLayout = defaultLayout;

export default communityHealth;
