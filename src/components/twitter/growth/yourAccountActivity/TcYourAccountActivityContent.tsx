import React from 'react';
import TcCard from '../../../shared/TcCard';
import TcIconWithTooltip from '../../../shared/TcIconWithTooltip';
import TcText from '../../../shared/TcText';
const yourAccountActivityMockList = [
  {
    description: 'Number of posts',
    value: 0,
    hasTooltipInfo: false,
  },
  {
    description: 'Replies',
    value: 0,
    hasTooltipInfo: false,
  },
  {
    description: 'Retweets',
    value: 0,
    hasTooltipInfo: false,
  },
  {
    description: 'Likes',
    value: 0,
    hasTooltipInfo: false,
  },
  {
    description: 'Mentions',
    value: 0,
    hasTooltipInfo: false,
  },
];

function TcYourAccountActivityContent() {
  return (
    <div className="overflow-x-scroll scrollbar-hide md:overflow-x-hidden">
      <div className="flex flex-row space-x-4 space-y-0 md:space-y-0">
        {yourAccountActivityMockList &&
          yourAccountActivityMockList.map((el, index) => (
            <TcCard
              key={index}
              elevation={0}
              variant="outlined"
              className="py-4 px-6 bg-transparent flex-1 md:w-auto min-w-full md:min-w-0"
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
    </div>
  );
}

export default TcYourAccountActivityContent;
