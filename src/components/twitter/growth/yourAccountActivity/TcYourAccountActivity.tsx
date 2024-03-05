import React, { useState, useEffect } from 'react';
import TcYourAccountActivityHeader from './TcYourAccountActivityHeader';
import TcYourAccountActivityContent from './TcYourAccountActivityContent';
import { IActivity } from '../../../../utils/interfaces';
import { capitalizeFirstChar } from '../../../../helpers/helper';

interface IAccountActivityItem {
  description: string;
  value: number;
  hasTooltipInfo: boolean;
}

interface ITcYourAccountActivityProps {
  activity: IActivity;
}

function TcYourAccountActivity({ activity }: ITcYourAccountActivityProps) {
  const [yourAccountActivityList, setYourAccountActivityList] = useState<
    IAccountActivityItem[]
  >([]);

  useEffect(() => {
    if (activity) {
      const newState = Object.keys(activity).map((key) => {
        const activityKey = key as keyof IActivity;

        return {
          description:
            activityKey === 'posts'
              ? 'Number of posts'
              : capitalizeFirstChar(activityKey),
          value: activity[activityKey],
          hasTooltipInfo: false,
        };
      });

      setYourAccountActivityList(newState);
    }
  }, [activity]);

  return (
    <div className="space-y-3">
      <TcYourAccountActivityHeader />
      <TcYourAccountActivityContent data={yourAccountActivityList} />
    </div>
  );
}

export default TcYourAccountActivity;
