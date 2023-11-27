import React from 'react';
import TcText from '../../shared/TcText';

function TcPlatformChannelDialogHeader() {
  return (
    <div>
      <TcText
        text={
          'Select channels to import activity in this workspace. Please give Together Crew access to all selected private channels by updating the channels permissions in Discord. Discord permission will affect the channels the bot can see.'
        }
        variant="body2"
      />
    </div>
  );
}

export default TcPlatformChannelDialogHeader;
