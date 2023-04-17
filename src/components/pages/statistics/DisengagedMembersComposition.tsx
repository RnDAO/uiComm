import { useEffect, useState } from 'react';
import useAppStore from '../../../store/useStore';
import LineGraph from '../../global/LineGraph';
import StatisticalData from './StatisticalData';
import { FiCalendar } from 'react-icons/fi';
import RangeSelect from '../../global/RangeSelect';
import { StatisticsProps } from '../../../utils/interfaces';

export interface DisengagedMembersComposition {
  activePeriod: number;
  handleDateRange: (range: number) => void;
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
    enabled: true,
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

export default function DisengagedMembersComposition({
  activePeriod,
  handleDateRange,
}: DisengagedMembersComposition) {
  const { disengagedMembers } = useAppStore();
  const [options, setOptions] = useState(defaultOptions);
  const [statistics, setStatistics] = useState<StatisticsProps[]>([]);

  useEffect(() => {
    // Copy options on each changes
    const newOptions = JSON.parse(JSON.stringify(defaultOptions));

    const newSeries = disengagedMembers?.series?.map(
      (disengagedMember: any) => {
        if (disengagedMember.name === 'becameDisengaged') {
          return {
            ...disengagedMember,
            color: '#FB3E56',
          };
        } else if (disengagedMember.name === 'wereNewlyActive') {
          return {
            ...disengagedMember,
            color: '#FF9022',
          };
        } else if (disengagedMember.name === 'wereConsistentlyActive') {
          return {
            ...disengagedMember,
            color: '#804EE1',
          };
        } else if (disengagedMember.name === 'wereVitalMembers') {
          return {
            ...disengagedMember,
            color: '#313671',
          };
        }

        return disengagedMember;
      }
    );

    newOptions.series = newSeries;
    newOptions.xAxis.categories = disengagedMembers.categories;

    setOptions(newOptions);

    setStatistics([
      {
        label: 'Became disengaged',
        description: "Were active, but didn't interact in the last 2 weeks",
        percentageChange: disengagedMembers.becameDisengagedPercentageChange
          ? disengagedMembers.becameDisengagedPercentageChange
          : 0,
        value: disengagedMembers.becameDisengaged,
        colorBadge: 'bg-error-500',
        hasTooltip: false,
      },
      {
        label: 'Were newly active',
        description:
          'Started interacting for the first time in the last 7 days',
        percentageChange: disengagedMembers.wereNewlyActivePercentageChange
          ? disengagedMembers.wereNewlyActivePercentageChange
          : 0,
        value: disengagedMembers.wereNewlyActive,
        colorBadge: 'bg-warning-500',
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
        label: 'Were consistently active',
        description:
          'Were interacting every week for at least 3 out of the last 4 weeks',
        percentageChange:
          disengagedMembers.wereConsistentlyActivePercentageChange
            ? disengagedMembers.wereConsistentlyActivePercentageChange
            : 0,
        value: disengagedMembers.wereConsistentlyActive,
        colorBadge: 'bg-secondary',
        hasTooltip: false,
      },
      {
        label: 'Were vital members',
        description: 'Were consistently active and very connected',
        percentageChange: disengagedMembers.wereVitalMembersPercentageChange
          ? disengagedMembers.wereVitalMembersPercentageChange
          : 0,
        value: disengagedMembers.wereVitalMembers,
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
    ]);
  }, [disengagedMembers]);

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
            <h3 className="text-lg font-medium text-lite-black">
              Disengaged members composition
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
