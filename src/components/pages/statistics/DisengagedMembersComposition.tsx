import { useEffect, useState } from 'react';
import useAppStore from '../../../store/useStore';
import LineGraph from '../../global/LineGraph';
import StatisticalData from './StatisticalData';
import { FiCalendar } from 'react-icons/fi';
import RangeSelect from '../../global/RangeSelect';
import { SeriesData, StatisticsProps } from '../../../utils/interfaces';
import { communityActiveDates } from '../../../lib/data/dateRangeValues';
import DisengagedMembersCompositionBreakdown from './memberBreakdowns/disengagedMembersComposition/DisengagedMembersCompositionBreakdown';
import Loading from '../../global/Loading';
import router from 'next/router';

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

export default function DisengagedMembersComposition({
  activePeriod,
  handleDateRange,
}: DisengagedMembersComposition) {
  const { disengagedMembers, disengagedMembersLoading } = useAppStore();
  const [options, setOptions] = useState(defaultOptions);
  const [statistics, setStatistics] = useState<StatisticsProps[]>([]);

  useEffect(() => {
    // Copy options on each changes
    const newOptions = JSON.parse(JSON.stringify(defaultOptions));

    if (disengagedMembers && disengagedMembers.series) {
      const maxDataValue = Math.max(
        ...disengagedMembers.series.map((s: SeriesData) => Math.max(...s.data))
      );

      if (maxDataValue > 0) {
        newOptions.yAxis.max = null;
      }
    }

    const newSeries = disengagedMembers?.series?.map(
      (disengagedMember: SeriesData) => {
        if (disengagedMember.name === 'becameDisengaged') {
          return {
            ...disengagedMember,
            name: 'Became Disengaged',
            color: '#FB3E56',
          };
        } else if (disengagedMember.name === 'wereNewlyActive') {
          return {
            ...disengagedMember,
            name: 'Were Newly Active',
            color: '#FF9022',
          };
        } else if (disengagedMember.name === 'wereConsistentlyActive') {
          return {
            ...disengagedMember,
            name: 'Were Consistently Active',
            color: '#804EE1',
          };
        } else if (disengagedMember.name === 'wereVitalMembers') {
          return {
            ...disengagedMember,
            name: 'Were Vital Members',
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
        label: 'Became Disengaged',
        description: "Were active, but didn't interact in the last 2 weeks",
        percentageChange: disengagedMembers.becameDisengagedPercentageChange
          ? disengagedMembers.becameDisengagedPercentageChange
          : 0,
        value: disengagedMembers.becameDisengaged,
        colorBadge: 'bg-error-500',
        hasTooltip: false,
        customBackground: false,
      },
      {
        label: 'Were Newly Active',
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
        label: 'Were Consistently Active',
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
        label: 'Were Vital Members',
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
      (filter) => filter.filterType === 'disengagedMemberComposition'
    );

    const newFilter = {
      filterType: 'disengagedMemberComposition',
      label: label,
    };

    if (existingFilterIndex !== -1) {
      // If it exists, replace the existing filter's label with the new label
      if (existingFilters[existingFilterIndex].label !== label) {
        existingFilters[existingFilterIndex].label = label;
      } else {
        existingFilters = [];
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
        <StatisticalData
          ableToFilter={true}
          overviewType="disengagedMemberComposition"
          statistics={[...statistics]}
          handleSelectedOption={handleSelectedOption}
        />
      </div>

      <DisengagedMembersCompositionBreakdown />

      <div className="w-full">
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between items-center pb-4">
          <h3 className="text-xl font-medium text-lite-black">
            Disengaged members over time
          </h3>
          <RangeSelect
            options={communityActiveDates}
            icon={<FiCalendar size={18} />}
            active={activePeriod}
            onClick={handleDateRange}
          />
        </div>
      </div>
      {disengagedMembersLoading ? (
        <Loading height="400px" />
      ) : (
        <LineGraph options={options} />
      )}
    </>
  );
}
