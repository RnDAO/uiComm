import React from "react";

import Highcharts from "highcharts";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import HighchartsReact from "highcharts-react-official";

import { options } from "../../lib/data/heatmap";

import { FiCalendar } from "react-icons/fi";
import RangeSelect from "./RangeSelect";
import ZonePicker from "./ZonePicker";

if (typeof Highcharts === "object") {
  HighchartsHeatmap(Highcharts);
}

type Props = {};

const communityActiveDates = [
  {
    title: "Last 7 days",
    value: 1,
  },
  {
    title: "1M",
    value: 2,
  },
  {
    title: "3M",
    value: 3,
  },
  {
    title: "6M",
    value: 4,
  },
  {
    title: "1Y",
    value: 5,
  },
];

const Chart = (props: Props) => {
  return (
    <div className="bg-white shadow-box rounded-lg p-5">
      <div className="flex flex-col md:flex-row justify-between items-baseline">
        <div className="px-3">
          <h3 className="font-bold text-xl md:text-2xl">
            When is the community most active?
          </h3>
          <p className="text-md md:text-base pt-4 text-gray-700 font-light">
            Hourly interaction summed over the selected time period.
          </p>
        </div>
        <div className="flex flex-col-reverse px-2.5 w-full md:w-auto md:flex-row space-y-3 md:space-y-0 md:space-x-3">
          <ZonePicker />
          <RangeSelect
            options={communityActiveDates}
            icon={<FiCalendar size={18} />}
          />
        </div>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
