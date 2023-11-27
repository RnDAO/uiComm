import React, { useEffect } from 'react';
import useAppStore from '../../../store/useStore';
import TcPlatformChannelList from './TcPlatformChannelList';

function TcPlatformChannelDialogBody() {
  return (
    <div className="border border-gray-300 rounded-md">
      <TcPlatformChannelList />
    </div>
  );
}

export default TcPlatformChannelDialogBody;
