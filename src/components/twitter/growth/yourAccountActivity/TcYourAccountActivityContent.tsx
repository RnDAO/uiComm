import React from 'react';
import TcCard from '../../../shared/TcCard';
import TcIconWithTooltip from '../../../shared/TcIconWithTooltip';
import TcText from '../../../shared/TcText';

interface IYourAccountActivityContentProps {
  data: {
    description: string;
    value: number;
    hasTooltipInfo: boolean;
  }[];
}

function TcYourAccountActivityContent({
  data,
}: IYourAccountActivityContentProps) {
  return (
    <div className="overflow-x-scroll scrollbar-hide md:overflow-x-hidden">
      <div className="flex flex-row space-x-4 space-y-0 md:space-y-0">
        {data &&
          data.map((el, index) => (
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
                    ) : null}
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
