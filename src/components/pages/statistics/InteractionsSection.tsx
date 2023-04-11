import { useEffect, useState } from 'react';
import useAppStore from '../../../store/useStore';
import LineGraph from '../../global/LineGraph';
import StatisticalData from './StatisticalData';
import { StatisticsProps } from '../../../utils/interfaces';

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

export default function InteractionsSection() {
  const { interactions } = useAppStore();
  const [options, setOptions] = useState(defaultOptions);
  const [statistics, setStatistics] = useState<StatisticsProps[]>([]);

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
        hasTooltip: false,
      },
      {
        label: 'Emojies',
        percentageChange: interactions.emojiPercentageChange,
        value: interactions.emojis,
        colorBadge: 'bg-warning-500',
        hasTooltip: false,
      },
    ]);
  }, [interactions]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between">
        <h3 className="text-lg font-medium text-lite-black">
          Type of interaction
        </h3>
      </div>
      <div className="overflow-x-scroll overflow-y-hidden md:overflow-hidden">
        <StatisticalData statistics={[...statistics]} />
      </div>
      <LineGraph options={options} />
    </>
  );
}
