import React from 'react';
import TcPlatformChannelList from './TcPlatformChannelList';

function TcPlatformChannelDialogBody() {
  return (
    <div className='rounded-md border border-gray-300'>
      <TcPlatformChannelList refreshTrigger={true} />
    </div>
  );
}

export default TcPlatformChannelDialogBody;
