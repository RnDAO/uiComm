import React from 'react';
import TcConnectedPlatforms from './TcConnectedPlatforms';
import TcAvailableIntegrations from './TcAvailableIntegrations';
import TcText from '../../shared/TcText';

function TcCommunityIntegrations() {
  return (
    <>
      <TcText text="Integration" variant={'h6'} />
      <div className="space-y-5">
        <div className="space-y-4 md:mb-8">
          <TcText
            text="Platforms currently connected to your community account"
            variant="body2"
          />
          <TcConnectedPlatforms />
        </div>
        <div className="space-y-4">
          <TcText
            text="Chose the platforms you want to connect with your community account"
            variant="body2"
          />
          <TcAvailableIntegrations />
        </div>
      </div>
    </>
  );
}

export default TcCommunityIntegrations;
