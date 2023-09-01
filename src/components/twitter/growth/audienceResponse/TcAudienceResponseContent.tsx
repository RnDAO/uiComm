import React from 'react';
import TcCard from '../../shared/TcCard';
import TcIconWithTooltip from '../../shared/TcIconWithTooltip';
import TcText from '../../shared/TcText';
const yourAccountActivityMockList = [
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

function TcAudienceResponseContent() {
  return (
    <div className="flex flex-row space-x-4">
      {yourAccountActivityMockList &&
        yourAccountActivityMockList.map((el, index) => (
          <TcCard
            key={index}
            elevation={0}
            variant="outlined"
            className="py-4 px-6 bg-transparent flex-1"
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

export default TcAudienceResponseContent;
