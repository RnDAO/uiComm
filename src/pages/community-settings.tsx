import React from 'react';
import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';
import TcBoxContainer from '../components/shared/TcBox/TcBoxContainer';
import TcText from '../components/shared/TcText';
import TcCommunityIntegrations from '../components/communitySettings/communityIntegrations/TcCommunityIntegrations';

function communitySettings() {
  return (
    <>
      <SEO titleTemplate="Community Settings" />
      <div className="flex flex-col container px-4 md:px-12 py-4">
        <TcBoxContainer
          contentContainerChildren={
            <div className="px-4 md:px-10 pt-4 pb-[4rem] space-y-4">
              <TcText text="Community Settings" variant={'h5'} />
              <div className="space-y-2">
                <TcCommunityIntegrations />
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}

communitySettings.pageLayout = defaultLayout;

export default communitySettings;
