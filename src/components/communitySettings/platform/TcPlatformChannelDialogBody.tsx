import React from 'react';
import TcPlatformChannelList from './TcPlatformChannelList';

function TcPlatformChannelDialogBody() {
  return (
    <div className="border border-gray-300 rounded-md">
      <TcPlatformChannelList refreshTrigger={true} />
    </div>
  );
}

export default TcPlatformChannelDialogBody;
