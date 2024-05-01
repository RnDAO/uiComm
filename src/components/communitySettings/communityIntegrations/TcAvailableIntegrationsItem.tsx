import React from 'react';
import { BsPlus } from 'react-icons/bs';

import TcIntegrationIcon from './TcIntegrationIcon';
import TcIntegrationCard from '../TcIntegrationCard';
import TcButton from '../../shared/TcButton';
import TcText from '../../shared/TcText';
import useAppStore from '../../../store/useStore';
import { IntegrationPlatform } from '../../../utils/enums';

interface ITcAvailableIntegrationsItemProps {
  integrationPlatform: IntegrationPlatform;
  disabled?: boolean;
}

function TcAvailableIntegrationsItem({
  integrationPlatform,
  disabled = false,
}: ITcAvailableIntegrationsItemProps) {
  const { connectNewPlatform } = useAppStore();

  const integratePlatform = () => {
    connectNewPlatform(integrationPlatform.toLocaleLowerCase());
  };

  return (
    <div
      data-testid='integration-item'
      data-platform={integrationPlatform}
      className='relative'
    >
      <TcIntegrationCard>
        <div className='space-y-4 px-2 pt-4 text-center'>
          <TcText text={integrationPlatform} variant='body1' />
          <div className='flex justify-center'>
            <TcIntegrationIcon
              platform={integrationPlatform}
              size={34}
              data-testid='integration-icon'
            />
          </div>
          {!disabled ? (
            <TcButton
              text='Connect'
              startIcon={<BsPlus />}
              className='max-w-full'
              size='small'
              onClick={() => integratePlatform()}
            />) : (
            <TcText text='Coming soon...' variant='body2' color='gray' />
          )
          }
        </div>
      </TcIntegrationCard>

      {disabled && (
        <div
          className='absolute inset-0 bg-gray-50 opacity-50 cursor-not-allowed'
          aria-hidden='true'
        />
      )}
    </div>
  );
}

export default TcAvailableIntegrationsItem;
