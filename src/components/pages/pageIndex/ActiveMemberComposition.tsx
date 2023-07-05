import React, { useEffect, useState } from 'react';
import StatisticalData from '../statistics/StatisticalData';
import useAppStore from '../../../store/useStore';
import CustomButton from '../../global/CustomButton';
import { useRouter } from 'next/router';
import { StorageService } from '../../../services/StorageService';
import { IUser } from '../../../utils/types';
import moment from 'moment';
import { StatisticsProps } from '../../../utils/interfaces';

const ActiveMemberComposition = () => {
  const router = useRouter();
  const [active, setActive] = useState(1);
  const { fetchActiveMembers, activeMembers } = useAppStore();
  const [statistics, setStatistics] = useState<StatisticsProps[]>([]);

  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');
    if (user) {
      const { guild } = user;
      fetchActiveMembers(
        guild.guildId,
        moment().subtract(7, 'days'),
        moment().format('YYYY-MM-DDTHH:mm:ss[Z]')
      );
    }
  }, []);

  useEffect(() => {
    // Copy options on each changes
    setStatistics([
      {
        label: 'Active Members',
        description: 'Interacted at least once in the last 7 days',
        percentageChange: activeMembers.totActiveMembersPercentageChange
          ? activeMembers.totActiveMembersPercentageChange
          : 0,
        value: activeMembers.totActiveMembers,
        colorBadge: 'bg-green',
        hasTooltip: true,
        customBackground: true,
        tooltipText: (
          <>
            <span>Interactions are all messages that:</span>
            <ol className="list-disc pl-8">
              <li>mention someone</li>
              <li>receive a reply</li>
              <li>receive a reaction</li>
              <li>happen in a thread</li>
            </ol>
            <p>Messages without replies or reactions are not counted.</p>
          </>
        ),
      },
      {
        label: 'Newly Active',
        description:
          'Started interacting for the first time in the last 7 days',
        percentageChange: activeMembers.newlyActivePercentageChange
          ? activeMembers.newlyActivePercentageChange
          : 0,
        value: activeMembers.newlyActive,
        colorBadge: 'bg-warning-500',
        hasTooltip: false,
      },
      {
        label: 'Consistently Active',
        description: 'Interacted weekly for at least 3 out of 4 weeks',
        percentageChange: activeMembers.consistentlyActivePercentageChange
          ? activeMembers.consistentlyActivePercentageChange
          : 0,
        value: activeMembers.consistentlyActive,
        colorBadge: 'bg-secondary',
        hasTooltip: false,
      },
      {
        label: 'Vital Members',
        description: 'Are consistently active and very connected',
        percentageChange: activeMembers.vitalMembersPercentageChange
          ? activeMembers.vitalMembersPercentageChange
          : 0,
        value: activeMembers.vitalMembers,
        colorBadge: 'bg-info-600',
        hasTooltip: true,
        tooltipText: (
          <>
            <span>
              Active member = at least 5 interactions with 5 other members.
            </span>
          </>
        ),
      },
      {
        label: 'Became Disengaged',
        description: "Were active, but didn't interact in the last 2 weeks",
        percentageChange: activeMembers.becameDisengagedPercentageChange
          ? activeMembers.becameDisengagedPercentageChange
          : 0,
        value: activeMembers.becameDisengaged,
        colorBadge: 'bg-error-500',
        hasTooltip: false,
      },
    ]);
  }, [activeMembers]);

  return (
    <div className="bg-white shadow-box rounded-lg py-8 px-5">
      <div className="px-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
          <h3 className="font-bold text-xl md:text-2xl pb-3">
            Members overview
          </h3>
        </div>
        <div className="overflow-x-scroll overflow-y-hidden md:overflow-hidden">
          <StatisticalData
            statistics={[...statistics]}
            hideInformationText={true}
          />
        </div>
        <div className="text-center mb-3">
          <CustomButton
            label={'Show more'}
            classes="bg-secondary text-white mx-auto"
            onClick={() => {
              router.push('/statistics');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ActiveMemberComposition;
