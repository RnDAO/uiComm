import { Alert, AlertTitle, IconButton,Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FaDiscord, FaEnvelope, FaTelegram, FaXTwitter } from 'react-icons/fa6';
import { FiCalendar } from 'react-icons/fi';

import { communityActiveDates } from '@/lib/data/dateRangeValues';

import LineGraph from '@/components/global/LineGraph';
import Loading from '@/components/global/Loading';
import RangeSelect from '@/components/global/RangeSelect';

import useAppStore from '@/store/useStore';

import { SeriesData, StatisticsProps } from '@/utils/interfaces';

import StatisticalData from './StatisticalData';

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

  const [showOverlay, setShowOverlay] = useState<boolean>(false);
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

  useEffect(() => {
    if (activePeriod === 4 || activePeriod === 5) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  }, [activePeriod]);

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
        <div className='relative'>
          {showOverlay && (
            <div className='absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95'>
              <Alert
                severity='info'
                className='w-full max-w-lg rounded-sm border border-blue-300 p-3'
              >
                <AlertTitle>
                  Interested in looking further back in history?
                </AlertTitle>
                <Typography variant='body1'>
                  Reach out to a member of our customer success team.
                </Typography>
                <div className='flex justify-center space-x-3 pt-3'>
                  <a
                    href='https://t.me/k_bc0'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <IconButton>
                      <FaTelegram className='text-gray-800' size={30} />
                    </IconButton>
                  </a>

                  <a
                    href='https://discord.com/users/876487027099582524'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <IconButton>
                      <FaDiscord className='text-gray-800' size={30} />
                    </IconButton>
                  </a>

                  <a href='mailto:info@togethercrew.com'>
                    <IconButton>
                      <FaEnvelope className='text-gray-800' size={30} />
                    </IconButton>
                  </a>

                  <a
                    href='https://x.com/together_crew'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <IconButton>
                      <FaXTwitter className='text-gray-800' size={30} />
                    </IconButton>
                  </a>
                </div>
              </Alert>
            </div>
          )}
          <LineGraph options={options} />
        </div>
      )}
    </>
  );
}
