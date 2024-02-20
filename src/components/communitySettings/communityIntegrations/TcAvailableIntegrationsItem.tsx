import React from 'react';
import TcIntegrationCard from '../TcIntegrationCard';
import TcButton from '../../shared/TcButton';
import { BsPlus } from 'react-icons/bs';
import TcText from '../../shared/TcText';
import TcIntegrationIcon from './TcIntegrationIcon';
import { IntegrationPlatform } from '../../../utils/enums';
import useAppStore from '../../../store/useStore';

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
          <TcButton
            text='Connect'
            startIcon={<BsPlus />}
            className='max-w-full'
            size='small'
            onClick={() => integratePlatform()}
          />
        </div>
      </TcIntegrationCard>

      {disabled && (
        <div
          className='absolute inset-0 bg-gray-50 opacity-30'
          aria-hidden='true'
        />
      )}
    </div>
  );
}

export default TcAvailableIntegrationsItem;
