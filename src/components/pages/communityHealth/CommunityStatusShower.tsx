import clsx from 'clsx';
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
  const getStatusMessage = () => {
    let iconBgColor = '';
    let message = '';

    switch (scoreStatus) {
      case 0:
        iconBgColor = 'bg-green-600';
        message = 'Your community is doing great!';
        break;
      case 1:
      case 2:
        iconBgColor = 'bg-secondary';
        message = isFragmentation
          ? 'Tips for making your community less fragmented'
          : 'Tips for centralizing';
        break;
      case -1:
      case -2:
        iconBgColor = 'bg-secondary';
        message = isFragmentation
          ? 'Tips for making your community less enmeshed'
          : 'Tips for decentralizing';
        break;
      default:
        break;
    }

    return (
      <div
        className={clsx(
          scoreStatus === 0
            ? 'bg-green-100'
            : `bg-gray-background hover:bg-[#e6e6e6] cursor-pointer'`,
          ' p-2 flex items-center justify-center space-x-2'
        )}
        onClick={() => (scoreStatus !== 0 ? toggleTipDialog() : null)}
      >
        <div className={`rounded-full ${iconBgColor} w-fit p-1`}>
          <AiOutlineBulb size={30} color="white" data-testid="bulb-icon" />
        </div>
        <span className="text-sm">{message}</span>
      </div>
    );
  };

  return <div>{getStatusMessage()}</div>;
}

CommunityStatusShower.defaultProps = {
  scoreStatus: -1,
};

export default CommunityStatusShower;
