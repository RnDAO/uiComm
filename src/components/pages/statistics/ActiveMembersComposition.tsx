import { useEffect, useState } from 'react';
import useAppStore from '../../../store/useStore';
import LineGraph from '../../global/LineGraph';
import StatisticalData from './StatisticalData';
import { FiCalendar } from 'react-icons/fi';
import RangeSelect from '../../global/RangeSelect';
import { StatisticsProps } from '../../../utils/interfaces';

export interface DisengagedMembersComposition {
  activePeriod: number;
  handleDateRange: (range: string | number) => void;
}

const defaultOptions = {
  chart: {
    zoomType: 'x',
  },
  rangeSelector: {
    enabled: true,
  },
  title: {
    text: '',
  },
  xAxis: {
    categories: [],
  },
  yAxis: {
    title: {
      text: '',
    },
  },
  series: [],
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      turboThreshold: 10000,
      dataGrouping: {
        enabled: true,
        groupPixelWidth: 20,
      },
    },
  },
};

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

export default function ActiveMembersComposition({
  activePeriod,
  handleDateRange,
}: DisengagedMembersComposition) {
  const { activeMembers } = useAppStore();
  const [options, setOptions] = useState(defaultOptions);
  const [statistics, setStatistics] = useState<StatisticsProps[]>([]);

  useEffect(() => {
    // Copy options on each changes
    const newOptions = JSON.parse(JSON.stringify(defaultOptions));

    const newSeries = activeMembers?.series?.map((activeMember: any) => {
      if (activeMember.name === 'totActiveMembers') {
        return {
          ...activeMember,
          color: '#3AAE2B',
        };
      } else if (activeMember.name === 'newlyActive') {
        return {
          ...activeMember,
          color: '#FF9022',
        };
      } else if (activeMember.name === 'consistentlyActive') {
        return {
          ...activeMember,
          color: '#804EE1',
        };
      } else if (activeMember.name === 'vitalMembers') {
        return {
          ...activeMember,
          color: '#313671',
        };
      } else if (activeMember.name === 'becameDisengaged') {
        return {
          ...activeMember,
          color: '#FB3E56',
        };
      }

      return activeMember;
    });

    newOptions.series = newSeries;
    newOptions.xAxis.categories = activeMembers.categories;

    setOptions(newOptions);

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

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
            <h3 className="text-lg font-medium text-lite-black">
              Active members composition
            </h3>
            <RangeSelect
              options={communityActiveDates}
              icon={<FiCalendar size={18} />}
              active={activePeriod}
              onClick={handleDateRange}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-scroll overflow-y-hidden md:overflow-hidden">
        <StatisticalData statistics={[...statistics]} />
      </div>
      <LineGraph options={options} />
    </>
  );
}
