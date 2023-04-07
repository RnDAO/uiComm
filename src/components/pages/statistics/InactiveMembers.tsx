import { useEffect, useState } from 'react';
import useAppStore from '../../../store/useStore';
import LineGraph from '../../global/LineGraph';
import StatisticalData from './StatisticalData';
import { FiCalendar } from 'react-icons/fi';
import RangeSelect from '../../global/RangeSelect';
import { StatisticsProps } from '../../../utils/interfaces';

const defaultOptions = {
  title: {
    text: '',
  },
  xAxis: {
    categories: ['03 May', '04 May', '05 May', '06 May'],
  },
  yAxis: {
    title: {
      text: '',
    },
  },
  series: [
    {
      name: 'Still active',
      data: [2, 4, 56, 233],
      color: '#FBD13E',
    },
  ],
  legend: {
    enabled: false,
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
  const { interactions } = useAppStore();
  const [options, setOptions] = useState(defaultOptions);
  const [statistics, setStatistics] = useState<StatisticsProps[]>([]);

  useEffect(() => {
    // Copy options on each changes
    // const newOptions = JSON.parse(JSON.stringify(defaultOptions));

    // const newSeries = interactions?.series?.map((interaction: any) => {
    //   if (interaction.name === 'messages') {
    //     return {
    //       ...interaction,
    //       color: '#804EE1',
    //     };
    //   } else if (interaction.name === 'emojis') {
    //     return {
    //       ...interaction,
    //       color: '#FF9022',
    //     };
    //   }
    //   return interaction;
    // });

    // newOptions.series = newSeries;
    // newOptions.xAxis.categories = interactions.categories;

    // setOptions(newOptions);

    setStatistics([
      {
        label: 'Still active',
        description: 'Were disengaged and became active again',
        percentageChange: 0,
        value: 0,
        colorBadge: 'bg-yellow',
        hasTooltip: false,
      },
    ]);
  }, [interactions]);

  return (
    <>
      <div className="flex flex-row justify-between">
        <h3 className="text-lg font-medium text-lite-black">
          Inactive members
        </h3>
        <RangeSelect
          options={communityActiveDates}
          icon={<FiCalendar size={18} />}
          active={activePeriod}
          onClick={handleDateRange}
        />
      </div>
      <StatisticalData statistics={[...statistics]} />
      <LineGraph options={options} />
    </>
  );
}
