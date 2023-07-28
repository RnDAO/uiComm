import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import HighchartsReact from 'highcharts-react-official';
import moment, { Moment } from 'moment';
import 'moment-timezone';
import SimpleBackdrop from '../../global/LoadingBackdrop';
import { StorageService } from '../../../services/StorageService';
import { IGuildChannels, IUser } from '../../../utils/types';
import NumberOfMessages from './NumberOfMessages';
import RangeSelect from '../../global/RangeSelect';
import ZonePicker from '../../global/ZonePicker';
import FilterByChannels from '../../global/FilterByChannels';
import useAppStore from '../../../store/useStore';
import { FiCalendar } from 'react-icons/fi';
import { communityActiveDates } from '../../../lib/data/dateRangeValues';
import * as Sentry from '@sentry/nextjs';
import { commonResponsiveSettings } from '../../../lib/data/heatmap';

if (typeof Highcharts === 'object') {
  HighchartsHeatmap(Highcharts);
}

const WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const HOURE_DAYS = Array.from({ length: 24 }, (_, i) => i).map(String);

const defaultHeatmapChartOptions = {
  chart: {
    type: 'heatmap',
    plotBorderWidth: 0,
  },
  title: {
    text: null,
  },
  legend: {
    enabled: false,
  },
  xAxis: {
    categories: HOURE_DAYS,
    tickInterval: 1,
    labels: {
      step: 1,
      style: {
        fontSize: '14px',
        fontFamily: 'Inter',
      },
    },
    opposite: true,
    gridLineWidth: 0,
    lineWidth: 0,
    lineColor: 'rgba(0,0,0,0.75)',
    tickWidth: 0,
    tickLength: 0,
    tickColor: 'rgba(0,0,0,0.75)',
    title: {
      text: 'Hour',
      style: {
        fontSize: '14px',
        fontFamily: 'Inter',
      },
      align: 'low',
    },
  },
  yAxis: {
    categories: WEEK_DAYS,
    lineWidth: 0,
    gridLineWidth: 0,
    title: 'Weekdays',
    reversed: true,
    labels: {
      style: {
        fontSize: '14px',
        fontFamily: 'Inter',
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  colorAxis: {
    min: 0,
    minColor: '#F3F3F3',
    maxColor: '#45367B',
    max: 100,
    stops: [
      [0, '#F3F3F3'],
      [10 / 100, '#F3F3F3'],
      [10 / 100, '#E3E9FF'],
      [20 / 100, '#E3E9FF'],
      [20 / 100, '#C5D2FF'],
      [30 / 100, '#C5D2FF'],
      [30 / 100, '#9971E7'],
      [50 / 100, '#9971E7'],
      [50 / 100, '#673FB5'],
      [70 / 100, '#673FB5'],
      [70 / 100, '#35205E'],
      [1, '#35205E'],
    ].map(([position, color]) => [position, color] as [number, string]),
  },
  series: [
    {
      name: 'Revenue',
      borderWidth: 0.5,
      borderColor: 'white',
      states: {
        hover: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          fontFamily: 'Inter',
          textOutline: 'none',
          fontWeight: 'normal',
        },
      },
      pointPadding: 1.5,
      data: Array.from({ length: 24 * 7 }, (_, i) => [
        i % 24,
        Math.floor(i / 24),
        0,
      ]),
      colsize: 0.9,
      rowsize: 0.8,
    },
  ],
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 600,
        },
        chartOptions: commonResponsiveSettings,
      },
    ],
  },
};

const HeatmapChart = () => {
  const [heatmapChartOptions, setHeatmapChartOptions] = useState(
    defaultHeatmapChartOptions
  );
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const [activeDateRange, setActiveDateRange] = useState(1);
  const [dateRange, setDateRange] = useState<
    [moment.Moment | null, moment.Moment | null]
  >([null, null]);
  const [selectedZone, setSelectedZone] = useState(moment.tz.guess());
  const [channels, setChannels] = useState<string[]>([]);

  const {
    fetchHeatmapData,
    getUserGuildInfo,
    fetchGuildChannels,
    selectedChannelsList,
    getSelectedChannelsList,
  } = useAppStore();

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = StorageService.readLocalStorage<IUser>('user');
      if (!storedUser) {
        return; // Exit early if there is no stored user
      }

      setUser(storedUser);

      try {
        const guildId = storedUser.guild.guildId;
        getUserGuildInfo(guildId);
        fetchGuildChannels(guildId);

        const channelsList: IGuildChannels[] | [] =
          await getSelectedChannelsList(guildId);

        if (!Array.isArray(channelsList) || channelsList.length === 0) {
          return;
        }

        const defaultEndDate = moment().subtract(1, 'day');
        const defaultStartDate = moment(defaultEndDate).subtract(7, 'days');

        setDateRange([defaultStartDate, defaultEndDate]);

        const channelIds = channelsList
          .flatMap((channel) => channel.subChannels || []) // Flatten the subChannels arrays
          .filter(Boolean) // Filter out falsy subChannels
          .map((subChannel) => subChannel.channelId);

        if (channelIds.length === 0) {
          return; // Exit early if there are no valid subChannels
        }

        setChannels(channelIds);

        await fetchHeatmapData(
          guildId,
          defaultStartDate,
          defaultEndDate,
          selectedZone,
          channelIds
        );
      } catch (error: unknown) {
        Sentry.captureException(error); // Handle any errors that occur
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const { guildId } = user.guild;
    fetchHeatmap(guildId, dateRange[0], dateRange[1], selectedZone, channels);
  }, [dateRange, selectedZone, channels]);

  const fetchHeatmap = async (
    guildId: string,
    startDate: moment.Moment | null,
    endDate: moment.Moment | null,
    timezone: string,
    channelIds: string[]
  ) => {
    if (!guildId || !startDate || !endDate) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetchHeatmapData(
        guildId,
        startDate,
        endDate,
        timezone,
        channelIds
      );
      setHeatmapChartOptions((prevOptions) => ({
        ...prevOptions,
        series: [
          {
            ...prevOptions.series[0],
            data: res?.map((item: any[]) => [item[1], item[0], item[2] || 0]),
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 600,
              },
              // Make the labels less space demanding on mobile
              chartOptions: {
                chart: {
                  scrollablePlotArea: {
                    minWidth: 1080,
                  },
                },
                legend: {
                  title: {
                    text: 'Number of interactions',
                    style: {
                      fontStyle: 'bold',
                      fontSize: '10px',
                      fontFamily: 'Inter',
                    },
                  },
                  align: 'left',
                  layout: 'horizontal',
                  margin: 0,
                  verticalAlign: 'bottom',
                  y: 0,
                  x: 25,
                  symbolHeight: 20,
                },
                xAxis: {
                  width: 1000,
                  labels: {
                    step: 1,
                    style: {
                      fontSize: '10px',
                      fontFamily: 'Inter',
                    },
                  },
                },
                yAxis: {
                  labels: {
                    style: {
                      fontSize: '10px',
                      fontFamily: 'Inter',
                    },
                  },
                },
                series: [
                  {
                    name: 'Revenue',
                    borderWidth: 0.5,
                    borderColor: 'white',
                    dataLabels: {
                      enabled: true,
                      style: {
                        fontSize: '10px',
                        fontFamily: 'Inter',
                      },
                    },
                    pointPadding: 0.8,
                    data: res?.map((item: any[]) => [
                      item[1],
                      item[0],
                      item[2] || 0,
                    ]),
                    colsize: 0.9,
                    rowsize: 0.9,
                  },
                ],
              },
            },
          ],
        },
      }));
    } catch (error) {
      Sentry.captureException(error); // Capture and send the error to Sentry
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectedZone = (zone: string) => {
    setSelectedZone(zone);
  };

  const handleSelectedChannels = (selectedChannels: string[]) => {
    setChannels(selectedChannels);
    if (user) {
      const { guildId } = user.guild;
      fetchHeatmap(
        guildId,
        dateRange[0],
        dateRange[1],
        selectedZone,
        selectedChannels
      );
    }
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
      setDateRange([startDate, endDate]);
    }
  };

  if (isLoading) return <SimpleBackdrop />;

  return (
    <div className="bg-white shadow-box rounded-lg p-5 min-h-[400px]">
      <div className="flex flex-col md:flex-row justify-between items-baseline">
        <div className="px-3">
          <h3 className="font-bold text-xl md:text-2xl">
            When is the community most active?
          </h3>
          <p className="text-md md:text-base pt-4 text-gray-700 font-light">
            Hourly messages summed over the selected time period.
          </p>
        </div>
        <div className="flex flex-col-reverse px-2.5 w-full md:w-auto md:flex-row space-y-3 md:space-y-0 md:space-x-3">
          <RangeSelect
            options={communityActiveDates}
            icon={<FiCalendar size={18} />}
            active={activeDateRange}
            onClick={handleDateRange}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-start md:justify-between items-center md:py-2 px-3">
        <div className="flex flex-col md:flex-row md:space-x-3 md:mt-3 w-full">
          <div className="flex flex-wrap">
            <ZonePicker
              selectedZone={selectedZone}
              handleSelectedZone={handleSelectedZone}
            />
          </div>
          <div className="flex flex-wrap">
            <FilterByChannels
              guildChannels={selectedChannelsList}
              filteredChannels={channels}
              handleSelectedChannels={handleSelectedChannels}
            />
          </div>
        </div>
        <div className="hidden md:block">
          <NumberOfMessages />
        </div>
      </div>
      <HighchartsReact
        highcharts={Highcharts}
        options={heatmapChartOptions}
        allowChartUpdate
      />
      <div className="block ml-3 md:hidden">
        <NumberOfMessages />
      </div>
    </div>
  );
};

export default HeatmapChart;
