import React from 'react';
import TcText from '../../shared/TcText';
import TcButton from '../../shared/TcButton';
import TcActiveCommunity from './TcActiveCommunity';
import router from 'next/router';

function TcSwitchCommunity() {
  return (
    <div className="py-5">
      <div className="flex justify-between items-center">
        <TcText text="Your community account" variant={'h6'} />
        <TcButton
          text={'Switch account'}
          variant="outlined"
          sx={{ width: '10.5rem', padding: '0.5rem' }}
          onClick={() => router.push('/community-settings/switch-community')}
        />
      </div>
      <TcActiveCommunity />
    </div>
  );
}

export default TcSwitchCommunity;
