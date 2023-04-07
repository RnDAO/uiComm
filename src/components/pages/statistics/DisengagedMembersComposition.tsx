import { useEffect, useState } from 'react';
import useAppStore from '../../../store/useStore';
import LineGraph from '../../global/LineGraph';
import StatisticalData from './StatisticalData';
import { FiCalendar } from 'react-icons/fi';
import RangeSelect from '../../global/RangeSelect';
import { StatisticsProps } from '../../../utils/interfaces';

export interface DisengagedMembersComposition {
  activePeriod: number;
  handleDateRange: (range: string | number) => void;
}

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
      name: 'Became disengaged',
      data: [2, 4, 56, 233],
      color: '#FB3E56',
    },
    {
      name: 'Were newly active',
      data: [22, 43, 156, 233],
      color: '#FF9022',
    },
    {
      name: 'Were consistently active',
      data: [12, 14, 52, 23],
      color: '#804EE1',
    },
    {
      name: 'Were vital members',
      data: [25, 43, 16, 33],
      color: '#313671',
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

export default function DisengagedMembersComposition({
  activePeriod,
  handleDateRange,
}: DisengagedMembersComposition) {
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
        label: 'Became disengaged',
        description: "Were active, but didn't interact in the last 2 weeks",
        percentageChange: 0,
        value: 0,
        colorBadge: 'bg-error-500',
        hasTooltip: false,
      },
      {
        label: 'Were newly active',
        description:
          'Started interacting for the first time in the last 7 days',
        percentageChange: 0,
        value: 0,
        colorBadge: 'bg-warning-500',
        hasTooltip: false,
      },
      {
        label: 'Were consistently active',
        description:
          'Were interacting every week for at least 3 out of the last 4 weeks',
        percentageChange: 0,
        value: 0,
        colorBadge: 'bg-secondary',
        hasTooltip: false,
      },
      {
        label: 'Were vital members',
        description: 'Were consistently active and very connected',
        percentageChange: 0,
        value: 0,
        colorBadge: 'bg-info-600',
        hasTooltip: false,
      },
    ]);
  }, [interactions]);

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="w-full">
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-lg font-medium text-lite-black">
              Disengaged members composition
            </h3>
            <RangeSelect
              options={communityActiveDates}
              icon={<FiCalendar size={18} />}
              active={activePeriod}
              onClick={handleDateRange}
            />
          </div>
        </div>
      </div>
      <StatisticalData statistics={[...statistics]} />
      <LineGraph options={options} />
    </>
  );
}
