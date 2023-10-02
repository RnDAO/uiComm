import clsx from 'clsx';
import React from 'react';
import TcText from '../../../shared/TcText';
import TcIconWithTooltip from '../../../shared/TcIconWithTooltip';
import { MdOutlineInfo } from 'react-icons/md';

interface ITcEngagementAccountContentItemsProps {
  value: string | number;
  description: string;
  tooltipText?: string;
  bgColor?: string;
}

function TcEngagementAccountContentItems({
  bgColor,
  value,
  description,
  tooltipText,
}: ITcEngagementAccountContentItemsProps) {
  return (
    <div
      className={clsx(bgColor, 'px-2 py-4 text-center rounded-xl space-y-2')}
    >
      <TcText
        text={value}
        color={bgColor === 'bg-[#3A9E2B]' ? 'white' : 'black'}
        variant={'h4'}
        fontWeight="bold"
        display="block"
      />
      <TcText
        text={description}
        color={bgColor === 'bg-[#3A9E2B]' ? 'white' : '#222222'}
        variant={'caption'}
        display="block"
        paddingX={1}
      />
      <div className="flex justify-center">
        {tooltipText && (
          <TcIconWithTooltip
            tooltipText={tooltipText}
            iconComponent={
              <MdOutlineInfo
                className="cursor-pointer"
                data-testid="icon-svg"
                size="23px"
                color={bgColor === 'bg-[#3A9E2B]' ? 'white' : '#6A6A6A'}
              />
            }
          />
        )}
      </div>
    </div>
  );
}

export default TcEngagementAccountContentItems;