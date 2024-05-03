import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';

import ActiveMemberBreakdown from './memberBreakdowns/activeMembers/ActiveMemberBreakdown';
import StatisticalData from './StatisticalData';
import LineGraph from '../../global/LineGraph';
import Loading from '../../global/Loading';
import RangeSelect from '../../global/RangeSelect';
import { communityActiveDates } from '../../../lib/data/dateRangeValues';
import useAppStore from '../../../store/useStore';
import { SeriesData, StatisticsProps } from '../../../utils/interfaces';

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
  const router = useRouter();

  const { activeMembers, activeMembersLoading } = useAppStore();

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
        description: 'Posted at least once in the last 7 days.',
        percentageChange: activeMembers.totActiveMembersPercentageChange
          ? activeMembers.totActiveMembersPercentageChange
          : 0,
        value: activeMembers.totActiveMembers,
        colorBadge: 'bg-green',
        hasTooltip: true,
        customBackground: false,
        tooltipText: (
          <>
            <span>Posting means any message in a channel or thread.</span>
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

  const handleSelectedOption = (label: string) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;

    let existingFilters: any[] = [];

    // Check if we already have some filters
    if (currentQuery.filter && typeof currentQuery.filter === 'string') {
      try {
        existingFilters = JSON.parse(currentQuery.filter);
      } catch (e) {
        console.error('Error parsing filters:', e);
      }
    }

    // Check if the filterType already exists in the array
    const existingFilterIndex = existingFilters.findIndex(
      (filter) => filter.filterType === 'activeMemberComposition'
    );

    const newFilter = {
      filterType: 'activeMemberComposition',
      label: label,
    };

    if (existingFilterIndex !== -1) {
      // If it exists, replace the existing filter's label with the new label
      if (existingFilters[existingFilterIndex].label !== label) {
        existingFilters[existingFilterIndex].label = label;
      } else {
        existingFilters.splice(existingFilterIndex, 1); // remove the item
      }
    } else {
      // If it doesn't exist, add the new filter to the array
      existingFilters.push(newFilter);
    }

    router.replace(
      {
        pathname: currentPath,
        query: {
          ...currentQuery,
          filter: JSON.stringify(existingFilters),
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <div className='flex flex-row justify-between'>
        <div className='w-full'>
          <div>
            <h3 className='text-xl font-medium text-lite-black'>
              Members overview
            </h3>
            <p className='py-2'>Today's statistics</p>
          </div>
        </div>
      </div>
      <div className='overflow-y-hidden overflow-x-scroll md:overflow-hidden'>
        <StatisticalData
          ableToFilter={true}
          overviewType='activeMemberComposition'
          statistics={[...statistics]}
          handleSelectedOption={handleSelectedOption}
        />
      </div>

      <ActiveMemberBreakdown />

      <div className='w-full'>
        <div className='flex flex-col items-center justify-between space-y-2 pb-4 md:flex-row md:space-y-0'>
          <h3 className='text-xl font-medium text-lite-black'>
            Active members over time
          </h3>
          <RangeSelect
            options={communityActiveDates}
            icon={<FiCalendar size={18} />}
            active={activePeriod}
            onClick={handleDateRange}
          />
        </div>
      </div>
      {activeMembersLoading ? (
        <Loading height='400px' />
      ) : (
        <LineGraph options={options} />
      )}
    </>
  );
}
