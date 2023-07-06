import React from 'react';
import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';

function communityHealth() {
  return (
    <>
      <SEO titleTemplate="Member interactions" />
      <div className="flex flex-col container justify-between px-4 md:px-12 py-3">
        communityHealth
      </div>
    </>
  );
}

communityHealth.pageLayout = defaultLayout;

export default communityHealth;
