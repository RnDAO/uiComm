import { useEffect, useState } from 'react';
import useAppStore from '../../../store/useStore';
import LineGraph from '../../global/LineGraph';
import StatisticalData from './StatisticalData';
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

export default function InteractionsSection() {
  const { interactions } = useAppStore();
  const [options, setOptions] = useState(defaultOptions);
  const [statistics, setStatistics] = useState<StatisticsProps[]>([]);

  useEffect(() => {
    // Copy options on each changes
    const newOptions = JSON.parse(JSON.stringify(defaultOptions));

    if (interactions && interactions.series) {
      const maxDataValue = Math.max(
        ...interactions.series.map((s: SeriesData) => Math.max(...s.data))
      );

      if (maxDataValue > 0) {
        newOptions.yAxis.max = null;
      }
    }

    const newSeries = interactions?.series?.map((interaction: SeriesData) => {
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
        percentageChange: interactions.msgPercentageChange
          ? interactions.msgPercentageChange
          : 0,
        value: interactions.messages,
        colorBadge: 'bg-secondary',
        hasTooltip: false,
      },
      {
        label: 'Emojies',
        percentageChange: interactions.emojiPercentageChange
          ? interactions.emojiPercentageChange
          : 0,
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
