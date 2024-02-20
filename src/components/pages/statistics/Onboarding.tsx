import router from 'next/router';
import { useEffect, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';

import OnboardingMembersBreakdown from './memberBreakdowns/onboardingMembers/OnboardingMembersBreakdown';
import StatisticalData from './StatisticalData';
import LineGraph from '../../global/LineGraph';
import Loading from '../../global/Loading';
import RangeSelect from '../../global/RangeSelect';
import { communityActiveDates } from '../../../lib/data/dateRangeValues';
import useAppStore from '../../../store/useStore';
import { SeriesData, StatisticsProps } from '../../../utils/interfaces';

export interface OnboardingProps {
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

export default function Onboarding({
  activePeriod,
  handleDateRange,
}: OnboardingProps) {
  const { onboardingMembers, onboardingMembersLoading } = useAppStore();
  const [options, setOptions] = useState(defaultOptions);
  const [statistics, setStatistics] = useState<StatisticsProps[]>([]);

  useEffect(() => {
    const newOptions = JSON.parse(JSON.stringify(defaultOptions));

    if (onboardingMembers && onboardingMembers.series) {
      const maxDataValue = Math.max(
        ...onboardingMembers.series.map((s: SeriesData) => Math.max(...s.data))
      );

      if (maxDataValue > 0) {
        newOptions.yAxis.max = null;
      }
    }

    const newSeries = onboardingMembers?.series?.map(
      (onboardingMembers: SeriesData) => {
        if (onboardingMembers.name === 'joined') {
          return {
            ...onboardingMembers,
            name: 'Joined',
            color: '#4368F1',
          };
        } else if (onboardingMembers.name === 'newlyActive') {
          return {
            ...onboardingMembers,
            name: 'Newly Active',
            color: '#FF9022',
          };
        } else if (onboardingMembers.name === 'stillActive') {
          return {
            ...onboardingMembers,
            name: 'Still Active',
            color: '#CCB8F3',
          };
        } else if (onboardingMembers.name === 'vitalMembers') {
          return {
            ...onboardingMembers,
            name: 'Vital Members',
            color: '#313671',
          };
        } else if (onboardingMembers.name === 'dropped') {
          return {
            ...onboardingMembers,
            name: 'Dropped',
            color: '#FB3E56',
          };
        }

        return onboardingMembers;
      }
    );

    newOptions.series = newSeries;
    newOptions.xAxis.categories = onboardingMembers.categories;

    setOptions(newOptions);
    setStatistics([
      {
        label: 'Joined',
        description: 'All members that joined in the last 7 days',
        percentageChange: onboardingMembers.joinedPercentageChange,
        value: onboardingMembers.joined,
        colorBadge: 'bg-info',
        hasTooltip: false,
        customBackground: false,
      },
      {
        label: 'Newly Active',
        description:
          'Started interacting for the first time in the last 7 days',
        percentageChange: onboardingMembers.newlyActivePercentageChange,
        value: onboardingMembers.newlyActive,
        colorBadge: 'bg-warning-500',
        hasTooltip: false,
      },
      {
        label: 'Still Active',
        description:
          'New members that remain interacting 2 weeks after their first interaction',
        percentageChange: onboardingMembers.stillActivePercentageChange,
        value: onboardingMembers.stillActive,
        colorBadge: 'bg-secondary-75',
        hasTooltip: false,
      },
      {
        label: 'Dropped',
        description:
          "Were newly active within the last 2 weeks, but didn't interact in the last 7 days",
        percentageChange: onboardingMembers.droppedPercentageChange,
        value: onboardingMembers.dropped,
        colorBadge: 'bg-error-500',
        hasTooltip: false,
      },
    ]);
  }, [onboardingMembers]);

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
      (filter) => filter.filterType === 'onboardingMemberComposition'
    );

    const newFilter = {
      filterType: 'onboardingMemberComposition',
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
              Onboarding overview
            </h3>
            <p className='py-2'>New members retention</p>
          </div>
        </div>
      </div>
      <div className='overflow-y-hidden overflow-x-scroll md:overflow-hidden'>
        <StatisticalData
          ableToFilter={true}
          overviewType='onboardingMemberComposition'
          statistics={[...statistics]}
          handleSelectedOption={handleSelectedOption}
        />
      </div>

      <OnboardingMembersBreakdown />

      <div className='w-full'>
        <div className='flex flex-col items-center justify-between space-y-2 pb-4 md:flex-row md:space-y-0'>
          <h3 className='text-xl font-medium text-lite-black'>
            Onboarded members over time
          </h3>
          <RangeSelect
            options={communityActiveDates}
            icon={<FiCalendar size={18} />}
            active={activePeriod}
            onClick={handleDateRange}
          />
        </div>
      </div>
      {onboardingMembersLoading ? (
        <Loading height='400px' />
      ) : (
        <LineGraph options={options} />
      )}
    </>
  );
}
