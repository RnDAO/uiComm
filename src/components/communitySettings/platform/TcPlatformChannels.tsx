import React from 'react';
import { FaHashtag } from 'react-icons/fa6';
import TcAvatar from '../../shared/TcAvatar';
import TcPlatformChannelDialog from './TcPlatformChannelDialog';

function TcPlatformChannels() {
  return (
    <div>
      <div className="flex items-stretch md:space-x-4">
        <TcAvatar className="hidden md:flex">
          <FaHashtag color="white" />
        </TcAvatar>
        <div className="space-y-4 pt-2">
          <TcPlatformChannelDialog />
        </div>
      </div>
    </div>
  );
}

export default TcPlatformChannels;
