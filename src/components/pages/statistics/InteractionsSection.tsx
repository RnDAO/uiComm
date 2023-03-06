import { useEffect, useState } from 'react';
import useAppStore from '../../../store/useStore';
import LineGraph from '../../global/LineGraph';
import StatisticalData from './StatisticalData';
import { FiCalendar } from 'react-icons/fi';
import RangeSelect from '../../global/RangeSelect';
import moment from 'moment';

const defaultOptions = {
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

export default function InteractionsSection({
  activePeriod,
  handleDateRange,
}: any) {
  const { interactions } = useAppStore();
  const [options, setOptions] = useState(defaultOptions);
  const [statistics, setStatistics] = useState<
    {
      label: string;
      percentageChange: any;
      value: any;
      colorBadge: string;
    }[]
  >([]);

  useEffect(() => {
    // Copy options on each changes
    const newOptions = JSON.parse(JSON.stringify(defaultOptions));

    const newSeries = interactions?.series?.map((interaction: any) => {
      if (interaction.name === 'messages') {
        return {
          ...interaction,
          color: '#804EE1',
        };
      } else if (interaction.name === 'emojis') {
        return {
          ...interaction,
          color: '#FF9022',
        };
      }
      return interaction;
    });

    newOptions.series = newSeries;
    newOptions.xAxis.categories = interactions.categories;

    setOptions(newOptions);

    setStatistics([
      {
        label: 'Messages',
        percentageChange: interactions.msgPercentageChange,
        value: interactions.messages,
        colorBadge: 'bg-secondary',
      },
      {
        label: 'Emojies',
        percentageChange: interactions.emojiPercentageChange,
        value: interactions.emojis,
        colorBadge: 'bg-warning-500',
      },
    ]);
  }, [interactions]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between">
        <h3 className="text-lg font-medium text-lite-black">
          Type of interaction
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
