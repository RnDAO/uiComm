import React, { useEffect, useState } from 'react';
import TcAccountActivityHeader from './TcAccountActivityHeader';
import TcAccountActivityContent from './TcAccountActivityContent';
import { IAccount } from '../../../../utils/interfaces';

interface ITcAccountActivityProps {
  account: IAccount;
}

interface IAccountItems {
  description: string;
  value: number;
  hasTooltipInfo: boolean;
}

function TcAccountActivity({ account }: ITcAccountActivityProps) {
  const [activityAccount, setActivityAccount] = useState<IAccountItems[]>([
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
  ]);

  useEffect(() => {
    if (account) {
      const updatedAccountActivity = [
        {
          description: 'Accounts that engage with you',
          value: account.engagement,
          hasTooltipInfo: true,
        },
        {
          description: 'Your followers',
          value: account.follower,
          hasTooltipInfo: false,
        },
      ];

      setActivityAccount(updatedAccountActivity);
    }
  }, [account]);

  return (
    <>
      <TcAccountActivityHeader />
      <TcAccountActivityContent activityList={activityAccount} />
    </>
  );
}

export default TcAccountActivity;
