import React from 'react';
import TcText from '../../shared/TcText';

function TcAudienceResponseHeader() {
  return (
    <div className="space-y-3">
      <TcText text="Audience response" variant="h6" fontWeight="bold" />
      <TcText
        text="How much others react to your activities"
        variant="caption"
        fontWeight="medium"
      />
    </div>
  );
}

export default TcAudienceResponseHeader;
