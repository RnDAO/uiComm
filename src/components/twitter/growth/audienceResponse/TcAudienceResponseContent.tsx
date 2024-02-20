import React from 'react';

import TcCard from '../../../shared/TcCard';
import TcIconWithTooltip from '../../../shared/TcIconWithTooltip';
import TcText from '../../../shared/TcText';

interface IAccountAudienceItem {
  description: string;
  value: number;
  hasTooltipInfo: boolean;
}

interface ITcAudienceResponseContentProps {
  data: IAccountAudienceItem[];
}

function TcAudienceResponseContent({ data }: ITcAudienceResponseContentProps) {
  return (
    <div className='scrollbar-hide overflow-x-scroll md:overflow-x-hidden'>
      <div className='flex flex-row space-x-4 space-y-0 md:space-y-0'>
        {data &&
          data.map((el, index) => (
            <TcCard
              key={index}
              elevation={0}
              variant='outlined'
              className='min-w-full flex-1 bg-transparent py-4 px-6 md:w-auto md:min-w-0'
              children={
                <div className='flex flex-col space-y-1 text-center'>
                  <TcText text={el.value} variant='h4' fontWeight='bold' />
                  <TcText
                    text={el.description}
                    variant='body2'
                    className='text-gray-subtitle'
                  />
                  <div className='flex justify-center'>
                    {el.hasTooltipInfo ? (
                      <TcIconWithTooltip tooltipText='Followers and non-followers' />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              }
            />
          ))}
      </div>
    </div>
  );
}

export default TcAudienceResponseContent;
