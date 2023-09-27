import React, { useEffect, useState } from 'react';
import TcEngagementAccountsHeader from './TcEngagementAccountsHeader';
import TcEngagementAccountsContent from './TcEngagementAccountsContent';
import { IEngagement } from '../../../../utils/interfaces';

interface ITcEngagementAccountsProps {
  engagement: IEngagement;
}

function TcEngagementAccounts({ engagement }: ITcEngagementAccountsProps) {
  const [contentItems, setContentItems] = useState([
    {
      bgColor: 'bg-[#D2F4CF]',
      value: 0,
      description: 'Only engaged a bit but deeper interactions',
      tooltipText:
        'Number of users with low engagement (less than 3 interactions) but of high quality  ( replying, mentioning, or quoting you)',
      label: 'Low',
    },
    {
      bgColor: 'bg-[#3A9E2B]',
      value: 0,
      description: 'Frequently engaged and deep interactions',
      tooltipText:
        'Number of users with high engagement (at least 3) and high quality (replies, quotes, or mentions you)',
    },
    {
      bgColor: 'bg-[#FBE8DA]',
      value: 0,
      description: 'Only engaged a bit and shallow interactions',
      tooltipText:
        'Number of users with low engagement (less than 3 interactions) but of high quality  ( replying, mentioning, or quoting you)',
      label: 'Low',
    },
    {
      bgColor: 'bg-[#D2F4CF]',
      value: 0,
      description: 'Frequently engaged but shallow interactions',
      tooltipText:
        'Number of users with high engagement (at least 3) but low quality (likes and retweets)',
      label: 'High',
    },
  ]);

  useEffect(() => {
    const updatedContentItems = [...contentItems];

    updatedContentItems[0].value = engagement.hqla;
    updatedContentItems[1].value = engagement.hqhe;
    updatedContentItems[2].value = engagement.lqla;
    updatedContentItems[3].value = engagement.lqhe;

    setContentItems(updatedContentItems);
  }, [engagement]);

  return (
    <div className="space-y-3">
      <TcEngagementAccountsHeader />
      <TcEngagementAccountsContent contentItems={contentItems} />
    </div>
  );
}

export default TcEngagementAccounts;
