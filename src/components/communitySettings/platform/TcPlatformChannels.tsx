import React from 'react';
import { FaHashtag } from 'react-icons/fa6';
import TcAvatar from '../../shared/TcAvatar';
import TcPlatformChannelDialog from './TcPlatformChannelDialog';

function TcPlatformChannels() {
  return (
    <div>
      <div className="flex items-stretch space-x-4">
        <TcAvatar>
          <FaHashtag color="black" />
        </TcAvatar>
        <div className="space-y-4 pt-2">
          <TcPlatformChannelDialog />
        </div>
      </div>
    </div>
  );
}

export default TcPlatformChannels;
