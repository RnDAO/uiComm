import React from 'react';
import TcBoxContainer from '../../shared/TcBox/TcBoxContainer';
import TcText from '../../shared/TcText';
import TcButton from '../../shared/TcButton';

interface TcPlatformProps {
  platformName?: string;
}

function TcPlatform({ platformName = 'Discord' }: TcPlatformProps) {
  return (
    <TcBoxContainer
      titleContainerChildren={
        <div className="p-4 md:p-10 flex justify-between items-center">
          <div>
            <TcText text={platformName} variant={'h6'} />
            <TcText text="Community:" variant={'body2'} color={'gray.100'} />
          </div>
          <TcButton
            text={'Disconnect'}
            variant="outlined"
            sx={{ width: '7.5rem', padding: '0.5rem' }}
          />
        </div>
      }
      contentContainerChildren={
        <div className="px-4 md:px-10 pt-4 pb-[4rem] space-y-4">s </div>
      }
    />
  );
}

export default TcPlatform;
