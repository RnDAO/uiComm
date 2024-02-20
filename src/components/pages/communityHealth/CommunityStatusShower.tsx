import React from 'react';
import { AiOutlineBulb } from 'react-icons/ai';

interface ICommunityStatusShowerProps {
  scoreStatus: number;
  isFragmentation: boolean;
  toggleTipDialog: () => void;
}

function CommunityStatusShower({
  scoreStatus,
  toggleTipDialog,
  isFragmentation,
}: ICommunityStatusShowerProps) {
  return (
    <div>
      {scoreStatus === 1 || scoreStatus === 2 ? (
        <div
          className='flex cursor-pointer items-center justify-center space-x-2 bg-gray-background p-2 hover:bg-[#e6e6e6]'
          onClick={toggleTipDialog}
        >
          <div className='w-fit rounded-full bg-secondary p-1'>
            <AiOutlineBulb size={30} color='white' data-testid='bulb-icon' />
          </div>
          <span className='text-sm'>
            {isFragmentation
              ? 'Tips for making your community less fragmented'
              : 'Tips for centralizing'}
          </span>
        </div>
      ) : scoreStatus === 0 ? (
        <div className='flex items-center justify-center space-x-2 bg-green-100 p-2'>
          <div className='w-fit rounded-full bg-green-600 p-1'>
            <AiOutlineBulb size={30} color='white' data-testid='bulb-icon' />
          </div>
          <span className='text-sm'>Your community is doing great!</span>
        </div>
      ) : scoreStatus === -1 || scoreStatus === -2 ? (
        <div
          className='flex cursor-pointer items-center justify-center space-x-2 bg-gray-background p-2 hover:bg-[#e6e6e6]'
          onClick={toggleTipDialog}
        >
          <div className='w-fit rounded-full bg-secondary p-1'>
            <AiOutlineBulb size={30} color='white' data-testid='bulb-icon' />
          </div>
          <span className='text-sm'>
            {isFragmentation
              ? 'Tips for making your community less enmeshed'
              : 'Tips for decentralizing'}
          </span>
        </div>
      ) : null}
    </div>
  );
}

CommunityStatusShower.defaultProps = {
  scoreStatus: -1,
};

export default CommunityStatusShower;
