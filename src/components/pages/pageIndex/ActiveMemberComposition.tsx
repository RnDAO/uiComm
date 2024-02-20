import React, { useEffect, useState } from 'react';
import StatisticalData from '../statistics/StatisticalData';
import useAppStore from '../../../store/useStore';
import { useRouter } from 'next/router';
import moment from 'moment';
import { StatisticsProps } from '../../../utils/interfaces';
import { useToken } from '../../../context/TokenContext';
import TcButton from '../../shared/TcButton';

const ActiveMemberComposition = () => {
  const { community } = useToken();

  const router = useRouter();
  const { fetchActiveMembers, activeMembers } = useAppStore();
  const [statistics, setStatistics] = useState<StatisticsProps[]>([]);

  useEffect(() => {
    let endDate: moment.Moment = moment().subtract(1, 'day');
    let startDate: moment.Moment = moment(endDate).subtract(7, 'days');

    const platformId = community?.platforms.find(
      (platform) => platform.disconnectedAt === null
    )?.id;

    if (platformId) {
      fetchActiveMembers(platformId, startDate, endDate);
    }
  }, []);

  useEffect(() => {
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
          <TcButton
            text={'Show more'}
            variant="contained"
            onClick={() => {
              router.push('/statistics');
            }}
            className="py-2 px-[5rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default ActiveMemberComposition;
