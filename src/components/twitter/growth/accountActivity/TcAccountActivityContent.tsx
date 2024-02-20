import React from 'react';
import TcCard from '../../../shared/TcCard';
import TcText from '../../../shared/TcText';
import TcIconWithTooltip from '../../../shared/TcIconWithTooltip';

interface ITcAccountActivityContentProps {
  activityList: {
    description: string;
    value: number;
    hasTooltipInfo: boolean;
  }[];
}

function TcAccountActivityContent({
  activityList,
}: ITcAccountActivityContentProps) {
  return (
    <div className='flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-4'>
      {activityList &&
        activityList.map((el, index) => (
          <TcCard
            key={index}
            elevation={0}
            className='md:min-h-auto min-h-[6rem] min-w-[250px] bg-gray-hover py-4 px-6'
            children={
              <div className='flex flex-col space-y-1 text-center'>
                <TcText text={el.value} variant={'h4'} fontWeight='bold' />
                <TcText
                  text={el.description}
                  variant={'body2'}
                  className='text-gray-subtitle'
                />
                <div className='flex cursor-pointer justify-center'>
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
  );
}

export default TcAccountActivityContent;
