import React from 'react';
import TcAudienceResponseHeader from './TcAudienceResponseHeader';
import TcAudienceResponseContent from './TcAudienceResponseContent';

function TcAudienceResponse() {
  return (
    <div className="space-y-3">
      <TcAudienceResponseHeader />
      <TcAudienceResponseContent />
    </div>
  );
}

export default TcAudienceResponse;
