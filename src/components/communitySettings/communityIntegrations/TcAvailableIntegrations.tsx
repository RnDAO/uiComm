import React from 'react';

import TcAvailableIntegrationsItem from './TcAvailableIntegrationsItem';
import { IntegrationPlatform } from '../../../utils/enums';

function TcAvailableIntegrations() {
  return (
    <div className='flex flex-row space-x-5 overflow-x-scroll py-2 md:overflow-x-hidden'>
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
