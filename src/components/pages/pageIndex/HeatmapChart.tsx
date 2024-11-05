import { Alert, AlertTitle, IconButton, Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { FaDiscord, FaEnvelope, FaTelegram, FaXTwitter } from 'react-icons/fa6';
import { FiCalendar } from 'react-icons/fi';
import 'moment-timezone';

import FilterByCategory from '@/components/global/FilterByCategory';

import { ICommunityPlatfromProps } from '@/utils/interfaces';

import { PREMIUM_GUILDS } from '../../communitySettings/communityPlatforms/TcDiscordIntegrationSettingsDialog';
import FilterByChannels from '../../global/FilterByChannels';
import Loading from '../../global/Loading';
import RangeSelect from '../../global/RangeSelect';
import ZonePicker from '../../global/ZonePicker';
import { ChannelContext } from '../../../context/ChannelContext';
import { useToken } from '../../../context/TokenContext';
import { extractTrueSubChannelIds } from '../../../helpers/helper';
import { transformToMidnightUTC } from '../../../helpers/momentHelper';
import { communityActiveDates } from '../../../lib/data/dateRangeValues';
import { defaultHeatmapChartOptions } from '../../../lib/data/heatmap';
import useAppStore from '../../../store/useStore';

if (typeof Highcharts === 'object') {
  HighchartsHeatmap(Highcharts);
}

type HeatmapDataPoint = [number, number, number | null];
type HeatmapData = HeatmapDataPoint[];

const HeatmapChart = () => {
  const channelContext = useContext(ChannelContext);

  const { selectedSubChannels, refreshData } = channelContext;

  const { fetchHeatmapData, retrievePlatformById } = useAppStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [activeDateRange, setActiveDateRange] = useState(1);
  const [platform, setPlatform] = useState<ICommunityPlatfromProps>();
  const [selectedZone, setSelectedZone] = useState(moment.tz.guess());
  const [heatmapChartOptions, setHeatmapChartOptions] = useState(
    defaultHeatmapChartOptions
  );
  const [platformFetched, setPlatformFetched] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const [allCategories, setAllCategories] = useState<boolean>(true);
  const [includeCategories, setIncludeCategories] = useState<string[]>([]);
  const [excludeCategories, setExcludeCategories] = useState<string[]>([]);

  const defaultEndDate = moment().subtract(1, 'day');
  const defaultStartDate = moment(defaultEndDate).subtract(7, 'days');

  const [dateRange, setDateRange] = useState<
    [string | moment.Moment, string | moment.Moment]
  >([
    transformToMidnightUTC(defaultStartDate).toString(),
    transformToMidnightUTC(defaultEndDate).toString(),
  ]);

  const { community, selectedPlatform } = useToken();

  useEffect(() => {
    const platform = community?.platforms.find(
      (platform) => platform.id === selectedPlatform
    );
    setPlatform(platform);

    if (platform?.name === 'discourse') {
      setAllCategories(true);
      setIncludeCategories([]);
      setExcludeCategories([]);
    }
  }, [selectedPlatform]);

  const fetchData = async () => {
    if (showOverlay) return;

    setLoading(true);
    try {
      if (platform && platform.name === 'discord') {
        const data = await fetchHeatmapData(
          platform.id,
          platform.name,
          dateRange[0],
          dateRange[1],
          selectedZone,
          extractTrueSubChannelIds(selectedSubChannels)
        );

        updateHeatmapData(data);
      } else if (platform && platform.name === 'discourse') {
        const data = await fetchHeatmapData(
          platform.id,
          platform.name,
          dateRange[0],
          dateRange[1],
          selectedZone,
          undefined,
          allCategories,
          includeCategories.length > 0 ? includeCategories : undefined,
          excludeCategories.length > 0 ? excludeCategories : undefined
        );

        updateHeatmapData(data);
      }
    } catch (error) {
      console.error('Error fetching heatmap data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateHeatmapData = (responseData: HeatmapData) => {
    const findBiggestValue = (data: HeatmapData) => {
      let biggestValue = 0;
      data.forEach((item) => {
        if (item[2] && item[2] > biggestValue) {
          biggestValue = item[2];
        }
      });
      return biggestValue;
    };

    const result = findBiggestValue(responseData);

    const periods = 6;
    const rangeStep = result / periods;

    const ranges = Array.from({ length: periods }, (_, i) =>
      Math.floor(i * rangeStep)
    );

    ranges.push(Math.floor(result));

    const newOptions = {
      ...defaultHeatmapChartOptions,
      colorAxis: {
        ...defaultHeatmapChartOptions.colorAxis,
        max: result > 0 ? result : 100,
      },
      series: [
        {
          ...defaultHeatmapChartOptions.series[0],
          data: responseData.map((item: HeatmapDataPoint) => [
            item[1],
            item[0],
            item[2] ?? 0,
          ]),
        },
      ],
    };

    setHeatmapChartOptions(newOptions);
  };

  useEffect(() => {
    const initializeSelectedChannels = async () => {
      if (platform && platform.name === 'discord') {
        await fetchPlatformChannels();
      }
    };

    initializeSelectedChannels();
  }, [platform]);

  const handleSelectedZone = (zone: string) => {
    setSelectedZone(zone);
  };

  const handleDateRange = (dateRangeType: number): void => {
    let endDate: moment.Moment = moment().subtract(1, 'day');
    let startDate: moment.Moment = moment(endDate).subtract(7, 'days');
    const isPremiumGuild =
      platform?.metadata?.id && PREMIUM_GUILDS.includes(platform.metadata.id);

    const handleNonPremiumLoading = () => {
      setShowOverlay(true);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    };

    switch (dateRangeType) {
      case 1:
        setActiveDateRange(dateRangeType);
        startDate = moment(endDate).subtract(7, 'days');
        endDate = moment().subtract(1, 'day');
        setShowOverlay(false);
        break;
      case 2:
        setActiveDateRange(dateRangeType);
        startDate = moment(endDate).subtract(1, 'months');
        endDate = moment().subtract(1, 'day');
        setShowOverlay(false);
        break;
      case 3:
        setActiveDateRange(dateRangeType);
        startDate = moment(endDate).subtract(3, 'months');
        endDate = moment().subtract(1, 'day');
        setShowOverlay(false);
        break;
      case 4:
        setActiveDateRange(dateRangeType);
        if (isPremiumGuild) {
          startDate = moment(endDate).subtract(6, 'months');
          endDate = moment().subtract(1, 'day');
          setShowOverlay(false);
        } else {
          handleNonPremiumLoading();
        }
        break;

      case 5:
        setActiveDateRange(dateRangeType);
        if (isPremiumGuild) {
          startDate = moment(endDate).subtract(12, 'months');
          endDate = moment().subtract(1, 'day');
          setShowOverlay(false);
        } else {
          handleNonPremiumLoading();
        }
        break;

      default:
        break;
    }

    if (startDate && endDate) {
      setDateRange([
        transformToMidnightUTC(startDate).toString(),
        transformToMidnightUTC(endDate).toString(),
      ]);
    }
  };

  const handleFetchHeatmapByChannels = () => {
    if (platformFetched && !showOverlay) {
      fetchData();
    }
  };

  const handleFetchHeatmapByCategories = (payload: {
    includeExclude: string;
    selectedCategoryIds: string[];
    allCategories: boolean;
  }) => {
    setAllCategories(payload.allCategories);

    if (payload.includeExclude === 'include') {
      setIncludeCategories(payload.selectedCategoryIds);
      setExcludeCategories([]);
    } else {
      setExcludeCategories(payload.selectedCategoryIds);
      setIncludeCategories([]);
    }
  };

  const fetchPlatformChannels = async () => {
    try {
      if (platform) {
        const data = await retrievePlatformById(platform.id);
        const { metadata } = data;
        if (metadata) {
          const { selectedChannels } = metadata;
          await refreshData(platform.id, 'channel', selectedChannels, true);
        } else {
          await refreshData(platform.id);
        }
        setPlatformFetched(true);
      }
    } catch (error) {
      console.error('Error fetching platform channels:', error);
    }
  };

  useEffect(() => {
    if (!platform || showOverlay) {
      return;
    }
    fetchData();
  }, [
    dateRange,
    selectedZone,
    platform,
    platformFetched,
    selectedPlatform,
    allCategories,
    includeCategories,
    excludeCategories,
  ]);

  return (
    <div className='min-h-[400px] rounded-lg bg-white p-5 shadow-box'>
      <div className='flex flex-col items-baseline justify-between md:flex-row'>
        <div className='px-3'>
          <h3 className='text-xl font-bold md:text-2xl'>
            When is the community most active?
          </h3>
          <p className='text-md pt-4 font-light text-gray-700 md:text-base'>
            Hourly messages summed over the selected time period.
          </p>
        </div>
        <div className='flex w-full flex-col-reverse space-y-3 px-2.5 md:w-auto md:flex-row md:space-y-0 md:space-x-3'>
          <RangeSelect
            options={communityActiveDates}
            icon={<FiCalendar size={18} />}
            active={activeDateRange}
            onClick={handleDateRange}
          />
        </div>
      </div>
      <div className='relative'>
        {loading && (
          <div className='absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-30'>
            <Loading size={40} height='440px' />
          </div>
        )}
        <div className={loading ? 'opacity-50' : ''}>
          <div className='z-[10] flex flex-col items-center justify-start px-3 md:absolute md:flex-row md:justify-between md:py-2'>
            <div className='flex w-full flex-col md:mt-6 md:flex-row md:space-x-3'>
              <div className='flex flex-wrap'>
                <ZonePicker
                  selectedZone={selectedZone}
                  handleSelectedZone={handleSelectedZone}
                />
              </div>
              {platform?.name === 'discord' ? (
                <div className='flex flex-wrap'>
                  <FilterByChannels
                    handleFetchHeatmapByChannels={handleFetchHeatmapByChannels}
                  />
                </div>
              ) : (
                <div className='flex flex-wrap'>
                  <FilterByCategory
                    handleFetchHeatmapByCategories={
                      handleFetchHeatmapByCategories
                    }
                  />
                </div>
              )}
            </div>
          </div>
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
            <HighchartsReact
              highcharts={Highcharts}
              options={heatmapChartOptions}
              allowChartUpdate
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapChart;
