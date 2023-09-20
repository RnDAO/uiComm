import React from 'react';
import TcAvailableIntegrationsItem from './TcAvailableIntegrationsItem';
import { IntegrationPlatform } from '../../../utils/enums';

function TcAvailableIntegrations() {
  return (
    <div className="flex flex-row space-x-5">
      {Object.values(IntegrationPlatform).map((platform, index) => (
        <TcAvailableIntegrationsItem
          disabled={index >= 2}
          key={platform}
          integrationPlatform={platform}
        />
      ))}
    </div>
  );
}

export default TcAvailableIntegrations;
