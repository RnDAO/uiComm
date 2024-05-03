import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import StatisticalData from '../statistics/StatisticalData';
import TcButton from '../../shared/TcButton';
import { useToken } from '../../../context/TokenContext';
import useAppStore from '../../../store/useStore';
import { StatisticsProps } from '../../../utils/interfaces';

const ActiveMemberComposition = () => {
  const { community } = useToken();

  const router = useRouter();
  const { fetchActiveMembers, activeMembers } = useAppStore();
  const [statistics, setStatistics] = useState<StatisticsProps[]>([]);

  useEffect(() => {
    const endDate: moment.Moment = moment().subtract(1, 'day');
    const startDate: moment.Moment = moment(endDate).subtract(7, 'days');

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
        description: 'Posted at least once in the last 7 days.',
        percentageChange: activeMembers.totActiveMembersPercentageChange
          ? activeMembers.totActiveMembersPercentageChange
          : 0,
        value: activeMembers.totActiveMembers,
        colorBadge: 'bg-green',
        hasTooltip: true,
        customBackground: true,
        tooltipText: (
          <>
            <span>Posting means any message in a channel or thread</span>
          </>
        ),
      },
      {
        label: 'Newly Active',
        description:
          'Started posting for the first time in the last 7 days.',
        percentageChange: activeMembers.newlyActivePercentageChange
          ? activeMembers.newlyActivePercentageChange
          : 0,
        value: activeMembers.newlyActive,
        colorBadge: 'bg-warning-500',
        hasTooltip: false,
      },
      {
        label: 'Consistently Active',
        description: 'Posted weekly for at least 3 out of 4 weeks.',
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
            <br />
            <span>Interactions are all messages that:</span>
            <ol className='list-disc pl-8'>
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
        label: 'Became Disengaged',
        description: "Were active, but didn't post in the last 2 weeks",
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
    <div className='rounded-lg bg-white py-8 px-5 shadow-box'>
      <div className='px-3'>
        <div className='flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0'>
          <h3 className='pb-3 text-xl font-bold md:text-2xl'>
            Members overview
          </h3>
        </div>
        <div className='overflow-y-hidden overflow-x-scroll md:overflow-hidden'>
          <StatisticalData
            statistics={[...statistics]}
            hideInformationText={true}
          />
        </div>
        <div className='mb-3 text-center'>
          <TcButton
            text='Show more'
            variant='contained'
            onClick={() => {
              router.push('/statistics');
            }}
            className='py-2 px-[5rem]'
          />
        </div>
      </div>
    </div>
  );
};

export default ActiveMemberComposition;
