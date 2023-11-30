import React from 'react';
import TcButton from '../../shared/TcButton';
import TcActiveCommunity from './TcActiveCommunity';
import router from 'next/router';
import TcText from '../../shared/TcText';

function TcSwitchCommunity() {
  return (
    <div className="md:py-5">
      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row text-left md:justify-between md:items-center">
        <TcText text="Your community account" variant={'h6'} />
        <TcButton
          text={'Switch account'}
          variant="outlined"
          sx={{ width: '10.5rem', padding: '0.5rem' }}
          onClick={() => router.push('/centric/select-community')}
        />
      </div>
      <TcActiveCommunity />
    </div>
  );
}

export default TcSwitchCommunity;
