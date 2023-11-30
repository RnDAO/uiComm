import React from 'react';
import TcAvailableIntegrationsItem from './TcAvailableIntegrationsItem';
import { IntegrationPlatform } from '../../../utils/enums';
import { useToken } from '../../../context/TokenContext';

function TcAvailableIntegrations() {
  const { community } = useToken();

  return (
    <div className="flex flex-row space-x-5">
      {Object.values(IntegrationPlatform).map((platform, index) => (
        <TcAvailableIntegrationsItem
          disabled={platform !== 'Discord'}
          key={platform}
          integrationPlatform={platform}
        />
      ))}
    </div>
  );
}

export default TcAvailableIntegrations;
