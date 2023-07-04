import { useEffect, useState } from 'react';
import useAppStore from '../../../store/useStore';
import LineGraph from '../../global/LineGraph';
import StatisticalData from './StatisticalData';
import { FiCalendar } from 'react-icons/fi';
import RangeSelect from '../../global/RangeSelect';
import { SeriesData, StatisticsProps } from '../../../utils/interfaces';
import { communityActiveDates } from '../../../lib/data/dateRangeValues';
import ActiveMemberBreakdown from './memberBreakdowns/activeMembers/ActiveMemberBreakdown';

export interface ActiveMembersComposition {
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
    gridLineWidth: 1.5,
    tickmarkPlacement: 'on',
    gridLineDashStyle: 'Dash', // set to 'Dash' for a dashed line
  },
  yAxis: {
    title: {
      text: '',
    },
    min: 0,
    max: 250,
  },
  series: [],
  legend: {
    enabled: true,
    align: 'left',
    verticalAlign: 'bottom',
    x: 10,
    y: -10,
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

export default function ActiveMembersComposition({
  activePeriod,
  handleDateRange,
}: ActiveMembersComposition) {
  const { activeMembers } = useAppStore();

  const [options, setOptions] = useState(defaultOptions);
  const [statistics, setStatistics] = useState<StatisticsProps[]>([]);

  useEffect(() => {
    // Copy options on each changes
    const newOptions = JSON.parse(JSON.stringify(defaultOptions));

    if (activeMembers && activeMembers.series) {
      const maxDataValue = Math.max(
        ...activeMembers.series.map((s: SeriesData) => Math.max(...s.data))
      );

      if (maxDataValue > 0) {
        newOptions.yAxis.max = null;
      }
    }

    const newSeries = activeMembers?.series?.map((activeMember: SeriesData) => {
      if (activeMember.name === 'totActiveMembers') {
        return {
          ...activeMember,
          name: 'Active Members',
          color: '#3AAE2B',
        };
      } else if (activeMember.name === 'newlyActive') {
        return {
          ...activeMember,
          name: 'Newly Active',
          color: '#FF9022',
        };
      } else if (activeMember.name === 'consistentlyActive') {
        return {
          ...activeMember,
          name: 'Consistently Active',
          color: '#804EE1',
        };
      } else if (activeMember.name === 'vitalMembers') {
        return {
          ...activeMember,
          name: 'Vital Members',
          color: '#313671',
        };
      } else if (activeMember.name === 'becameDisengaged') {
        return {
          ...activeMember,
          name: 'Became Disengaged',
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
    <>
      <div className="flex flex-row justify-between">
        <div className="w-full">
          <div>
            <h3 className="text-xl font-medium text-lite-black">
              Members overview
            </h3>
            <p className="py-2">Today's statistics</p>
          </div>
        </div>
      </div>
      <div className="overflow-x-scroll overflow-y-hidden md:overflow-hidden">
        <StatisticalData statistics={[...statistics]} />
      </div>

      <ActiveMemberBreakdown />

      <div className="w-full">
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between items-center pb-4">
          <h3 className="text-xl font-medium text-lite-black">
            Members activity over time
          </h3>
          <RangeSelect
            options={communityActiveDates}
            icon={<FiCalendar size={18} />}
            active={activePeriod}
            onClick={handleDateRange}
          />
        </div>
      </div>
      <LineGraph options={options} />
    </>
  );
}
