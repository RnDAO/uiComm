import React, { useEffect, useState } from 'react';
import TcAudienceResponseHeader from './TcAudienceResponseHeader';
import TcAudienceResponseContent from './TcAudienceResponseContent';
import { capitalizeFirstChar } from '../../../../helpers/helper';
import { IAudience } from '../../../../utils/interfaces';
interface ITcAudienceResponseProps {
  audience: IAudience;
}

interface IAccountAudienceItem {
  description: string;
  value: number;
  hasTooltipInfo: boolean;
}

function TcAudienceResponse({ audience }: ITcAudienceResponseProps) {
  const [audienceResponseList, setAudienceResponseList] = useState<
    IAccountAudienceItem[]
  >([]);

  useEffect(() => {
    if (audience) {
      const newState = Object.keys(audience).map((key) => {
        const audienceKey = key as keyof IAudience;
        return {
          description: capitalizeFirstChar(audienceKey),
          value: audience[audienceKey],
          hasTooltipInfo: false,
        };
      });
      setAudienceResponseList(newState);
    }
  }, [audience]);

  return (
    <div className='space-y-3'>
      <TcAudienceResponseHeader />
      <TcAudienceResponseContent data={audienceResponseList} />
    </div>
  );
}

export default TcAudienceResponse;
