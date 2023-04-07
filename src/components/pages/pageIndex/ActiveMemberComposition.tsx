import React, { useEffect, useState } from 'react';
import StatisticalData from '../statistics/StatisticalData';
import useAppStore from '../../../store/useStore';
import CustomButton from '../../global/CustomButton';
import { useRouter } from 'next/router';
import { StorageService } from '../../../services/StorageService';
import { IUser } from '../../../utils/types';
import moment from 'moment';
import RangeSelect from '../../global/RangeSelect';
import { FiCalendar } from 'react-icons/fi';

const ActiveMemberComposition = () => {
  const router = useRouter();
  const [active, setActive] = useState(1);
  const { fetchActiveMembers, activeMembers } = useAppStore();
  const [statistics, setStatistics] = useState<
    {
      label: string;
      percentageChange: any;
      description: string;
      value: any;
      colorBadge: string;
      hasTooltip: boolean;
      tooltipText?: React.ReactNode;
    }[]
  >([]);

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

  const communityActiveDates = [
    {
      title: 'Last 7 days',
      value: 1,
    },
    {
      title: '1M',
      value: 2,
    },
    {
      title: '3M',
      value: 3,
    },
    {
      title: '6M',
      value: 4,
    },
    {
      title: '1Y',
      value: 5,
    },
  ];

  useEffect(() => {
    // Copy options on each changes
    setStatistics([
      {
        label: 'Tot active members',
        description: 'Interacted at least once in the last 7 days',
        percentageChange: activeMembers.totActiveMembersPercentageChange,
        value: activeMembers.totActiveMembers,
        colorBadge: 'bg-green',
        hasTooltip: true,
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
        label: 'Newly active',
        description:
          'Started interacting for the first time in the last 7 days',
        percentageChange: activeMembers.newlyActivePercentageChange,
        value: activeMembers.newlyActive,
        colorBadge: 'bg-warning-500',
        hasTooltip: false,
      },
      {
        label: 'Consistently active',
        description: 'Interacted weekly for at least 3 out of 4 weeks',
        percentageChange: activeMembers.consistentlyActivePercentageChange,
        value: activeMembers.consistentlyActive,
        colorBadge: 'bg-secondary',
        hasTooltip: false,
      },
      {
        label: 'Vital members',
        description: 'Are consistently active and very connected',
        percentageChange: activeMembers.vitalMembersPercentageChange,
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
        label: 'Became disengaged',
        description: "Were active, but didn't interact in the last 2 weeks",
        percentageChange: activeMembers.becameDisengagedPercentageChange,
        value: activeMembers.becameDisengaged,
        colorBadge: 'bg-error-500',
        hasTooltip: false,
      },
    ]);
  }, [activeMembers]);

  const handleDateRange = (dateRangeType: string | number) => {
    let dateTime: string[] = [];
    switch (dateRangeType) {
      case 1:
        setActive(dateRangeType);
        dateTime = [
          moment().subtract('7', 'days').format('YYYY-MM-DDTHH:mm:ss[Z]'),
          moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        ];
        break;
      case 2:
        setActive(dateRangeType);
        dateTime = [
          moment().subtract('1', 'months').format('YYYY-MM-DDTHH:mm:ss[Z]'),
          moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        ];
        break;
      case 3:
        setActive(dateRangeType);
        dateTime = [
          moment().subtract('3', 'months').format('YYYY-MM-DDTHH:mm:ss[Z]'),
          moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        ];
        break;
      case 4:
        setActive(dateRangeType);
        dateTime = [
          moment().subtract('6', 'months').format('YYYY-MM-DDTHH:mm:ss[Z]'),
          moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        ];
        break;
      case 5:
        setActive(dateRangeType);
        dateTime = [
          moment().subtract('1', 'year').format('YYYY-MM-DDTHH:mm:ss[Z]'),
          moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        ];
        break;
      default:
        break;
    }
    const user = StorageService.readLocalStorage<IUser>('user');
    if (user) {
      const { guild } = user;
      fetchActiveMembers(guild.guildId, dateTime[0], dateTime[1]);
    }
  };

  return (
    <div className="bg-white shadow-box rounded-lg py-8 px-5">
      <div className="px-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
          <h3 className="text-lg font-medium text-lite-black">
            Active members composition
          </h3>
          <RangeSelect
            options={communityActiveDates}
            icon={<FiCalendar size={18} />}
            active={active}
            onClick={handleDateRange}
          />
        </div>
        <div className="overflow-x-scroll overflow-y-hidden md:overflow-hidden">
          <StatisticalData statistics={[...statistics]} />
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
