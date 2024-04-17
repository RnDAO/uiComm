'use client';
import Highcharts from 'highcharts';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import 'moment-timezone';

import NumberOfMessages from './NumberOfMessages';
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
  const [selectedZone, setSelectedZone] = useState(moment.tz.guess());
  const [heatmapChartOptions, setHeatmapChartOptions] = useState(
    defaultHeatmapChartOptions
  );
  const [platformFetched, setPlatformFetched] = useState<boolean>(false);

  const defaultEndDate = moment().subtract(1, 'day');
  const defaultStartDate = moment(defaultEndDate).subtract(7, 'days');

  const [dateRange, setDateRange] = useState<
    [string | moment.Moment, string | moment.Moment]
  >([
    transformToMidnightUTC(defaultStartDate).toString(),
    transformToMidnightUTC(defaultEndDate).toString(),
  ]);

  const { community } = useToken();

  const platformId = community?.platforms.find(
    (platform) => platform.disconnectedAt === null
  )?.id;

  const fetchData = async () => {
    setLoading(true);
    try {
      if (platformId) {
        const data = await fetchHeatmapData(
          platformId,
          dateRange[0],
          dateRange[1],
          selectedZone,
          extractTrueSubChannelIds(selectedSubChannels)
        );

        if (data) {
          updateHeatmapData(data);
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const updateHeatmapData = (responseData: HeatmapData) => {
    const newOptions = {
      ...defaultHeatmapChartOptions,
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
      await fetchPlatformChannels();
    };

    initializeSelectedChannels();
  }, []);

  const handleSelectedZone = (zone: string) => {
    setSelectedZone(zone);
  };

  const handleDateRange = (dateRangeType: number): void => {
    let endDate: moment.Moment = moment().subtract(1, 'day');
    let startDate: moment.Moment = moment(endDate).subtract(7, 'days');

    switch (dateRangeType) {
      case 1:
        setActiveDateRange(dateRangeType);
        startDate = moment(endDate).subtract(7, 'days');
        endDate = moment().subtract(1, 'day');
        break;
      case 2:
        setActiveDateRange(dateRangeType);
        startDate = moment(endDate).subtract(1, 'months');
        endDate = moment().subtract(1, 'day');
        break;
      case 3:
        setActiveDateRange(dateRangeType);
        startDate = moment(endDate).subtract(3, 'months');
        endDate = moment().subtract(1, 'day');
        break;
      case 4:
        setActiveDateRange(dateRangeType);
        startDate = moment(endDate).subtract(6, 'months');
        endDate = moment().subtract(1, 'day');
        break;
      case 5:
        setActiveDateRange(dateRangeType);
        startDate = moment(endDate).subtract(1, 'year');
        endDate = moment().subtract(1, 'day');
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
    if (platformFetched) {
      fetchData();
    }
  };

  const fetchPlatformChannels = async () => {
    try {
      if (platformId) {
        const data = await retrievePlatformById(platformId);
        const { metadata } = data;
        if (metadata) {
          const { selectedChannels } = metadata;
          await refreshData(platformId, 'channel', selectedChannels, true);
        } else {
          await refreshData(platformId);
        }
        setPlatformFetched(true);
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    if (!platformId) {
      return;
    }
    fetchData();
  }, [dateRange, selectedZone, platformId, platformFetched]);

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
      <div className='flex flex-col items-center justify-start px-3 md:flex-row md:justify-between md:py-2'>
        <div className='flex w-full flex-col md:mt-3 md:flex-row md:space-x-3'>
          <div className='flex flex-wrap'>
            <ZonePicker
              selectedZone={selectedZone}
              handleSelectedZone={handleSelectedZone}
            />
          </div>
          <div className='flex flex-wrap'>
            <FilterByChannels
              handleFetchHeatmapByChannels={handleFetchHeatmapByChannels}
            />
          </div>
        </div>
        <div className='hidden md:block'>
          <NumberOfMessages />
        </div>
      </div>
      <div className='relative'>
        {loading && (
          <div className='absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-30'>
            <Loading size={40} height='440px' />
          </div>
        )}

        {/* <div className={loading ? 'opacity-50' : ''}>
          <HighchartsReact
            highcharts={Highcharts}
            options={heatmapChartOptions}
            allowChartUpdate
          />
        </div> */}
      </div>

      <div className='ml-3 block md:hidden'>
        <NumberOfMessages />
      </div>
    </div>
  );
};

export default HeatmapChart;
