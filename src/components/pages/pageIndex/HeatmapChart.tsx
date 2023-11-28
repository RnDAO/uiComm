import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import 'moment-timezone';
import SimpleBackdrop from '../../global/LoadingBackdrop';
import { IGuildChannels, IUser } from '../../../utils/types';
import NumberOfMessages from './NumberOfMessages';
import RangeSelect from '../../global/RangeSelect';
import ZonePicker from '../../global/ZonePicker';
import FilterByChannels from '../../global/FilterByChannels';
import useAppStore from '../../../store/useStore';
import { FiCalendar } from 'react-icons/fi';
import { communityActiveDates } from '../../../lib/data/dateRangeValues';
import * as Sentry from '@sentry/nextjs';
import { transformToMidnightUTC } from '../../../helpers/momentHelper';
import { useToken } from '../../../context/TokenContext';
import { defaultHeatmapChartOptions } from '../../../lib/data/heatmap';
import TcPeriodRange from '../../communitySettings/platform/TcPeriodRange';

if (typeof Highcharts === 'object') {
  HighchartsHeatmap(Highcharts);
}

const HeatmapChart = () => {
  const { fetchHeatmapData } = useAppStore();
  const [selectedZone, setSelectedZone] = useState(moment.tz.guess());
  const [heatmapChartOptions, setHeatmapChartOptions] = useState(
    defaultHeatmapChartOptions
  );
  const [platfromAnalyzerDate, setPlatfromAnalyzerDate] = useState<string>('');

  const { community } = useToken();

  const platformId = community?.platforms[0];
  useEffect(() => {
    const defaultEndDate = moment().subtract(1, 'day');
    const defaultStartDate = moment(defaultEndDate).subtract(7, 'days');

    fetchHeatmapData(
      platformId,
      defaultStartDate,
      defaultEndDate,
      selectedZone,
      []
    );
  }, []);
  console.log({ platfromAnalyzerDate });

  const handleSelectedZone = (zone: string) => {
    setSelectedZone(zone);
  };

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
          <TcPeriodRange
            handleSelectedDate={(date) => setPlatfromAnalyzerDate(date)}
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
          <div className="flex flex-wrap"></div>
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
