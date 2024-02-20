import { useEffect, useState } from 'react';
import useAppStore from '../../../store/useStore';
import LineGraph from '../../global/LineGraph';
import StatisticalData from './StatisticalData';
import { FiCalendar } from 'react-icons/fi';
import RangeSelect from '../../global/RangeSelect';
import { SeriesData, StatisticsProps } from '../../../utils/interfaces';
import { communityActiveDates } from '../../../lib/data/dateRangeValues';
import Loading from '../../global/Loading';

export interface InactiveMembersProps {
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

export default function InactiveMembers({
  activePeriod,
  handleDateRange,
}: InactiveMembersProps) {
  const { inactiveMembers, inactiveMembersLoading } = useAppStore();
  const [options, setOptions] = useState(defaultOptions);
  const [statistics, setStatistics] = useState<StatisticsProps[]>([]);

  useEffect(() => {
    // Copy options on each changes
    const newOptions = JSON.parse(JSON.stringify(defaultOptions));

    if (inactiveMembers && inactiveMembers.series) {
      const maxDataValue = Math.max(
        ...inactiveMembers.series.map((s: SeriesData) => Math.max(...s.data))
      );

      if (maxDataValue > 0) {
        newOptions.yAxis.max = null;
      }
    }

    const newSeries = inactiveMembers?.series?.map(
      (inactiveMember: SeriesData) => {
        if (inactiveMember.name === 'returned') {
          return {
            ...inactiveMember,
            name: 'Returned',
            color: '#FBD13E',
          };
        }
        return inactiveMember;
      }
    );

    newOptions.series = newSeries;
    newOptions.xAxis.categories = inactiveMembers.categories;

    setOptions(newOptions);

    setStatistics([
      {
        label: 'Returned',
        description: 'Were disengaged and became active again',
        percentageChange: inactiveMembers.returnedPercentageChange
          ? inactiveMembers.returnedPercentageChange
          : 0,
        value: inactiveMembers.returned,
        colorBadge: 'bg-yellow',
        hasTooltip: false,
      },
    ]);
  }, [inactiveMembers]);

  return (
    <>
      <div className='flex flex-row justify-between'>
        <h3 className='text-xl font-medium text-lite-black'>
          Inactive members
        </h3>
      </div>
      <div className='overflow-y-hidden overflow-x-scroll md:overflow-hidden'>
        <StatisticalData statistics={[...statistics]} />
      </div>
      <div className='w-full'>
        <div className='flex flex-col items-center justify-between space-y-2 pb-4 md:flex-row md:space-y-0'>
          <h3 className='text-xl font-medium text-lite-black'>
            Returned members over time
          </h3>
          <RangeSelect
            options={communityActiveDates}
            icon={<FiCalendar size={18} />}
            active={activePeriod}
            onClick={handleDateRange}
          />
        </div>
      </div>
      {inactiveMembersLoading ? (
        <Loading height='400px' />
      ) : (
        <LineGraph options={options} />
      )}
    </>
  );
}
