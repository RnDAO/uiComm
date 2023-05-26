import { useEffect, useState } from 'react';
import useAppStore from '../../../store/useStore';
import LineGraph from '../../global/LineGraph';
import StatisticalData from './StatisticalData';
import { FiCalendar } from 'react-icons/fi';
import RangeSelect from '../../global/RangeSelect';
import { SeriesData, StatisticsProps } from '../../../utils/interfaces';

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

export default function InactiveMembers({
  activePeriod,
  handleDateRange,
}: any) {
  const { inactiveMembers } = useAppStore();
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
      <div className="flex flex-row justify-between">
        <h3 className="text-lg font-medium text-lite-black">
          Inactive members
        </h3>
      </div>
      <div className="overflow-x-scroll overflow-y-hidden md:overflow-hidden">
        <StatisticalData statistics={[...statistics]} />
      </div>
      <LineGraph options={options} />
    </>
  );
}
