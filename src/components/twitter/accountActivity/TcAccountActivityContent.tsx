import React from 'react';
import TcCard from '../shared/TcCard';
import TcText from '../shared/TcText';
import TcIconWithTooltip from '../shared/TcIconWithTooltip';

const accountActivityMockList = [
  {
    description: 'Accounts that engage with you',
    value: 0,
    hasTooltipInfo: true,
  },
  {
    description: 'Your followers',
    value: 0,
    hasTooltipInfo: false,
  },
];

function TcAccountActivityContent() {
  return (
    <div className="flex flex-row space-x-4">
      {accountActivityMockList &&
        accountActivityMockList.map((el, index) => (
          <TcCard
            key={index}
            elevation={0}
            className="py-4 px-6 bg-gray-hover min-w-[250px]"
            children={
              <div className="text-center flex flex-col space-y-1">
                <TcText text={el.value} variant={'h4'} fontWeight="bold" />
                <TcText
                  text={el.description}
                  variant={'body2'}
                  className="text-gray-subtitle"
                />
                <div className="flex justify-center">
                  {el.hasTooltipInfo ? (
                    <TcIconWithTooltip tooltipText="Followers and non-followers" />
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
