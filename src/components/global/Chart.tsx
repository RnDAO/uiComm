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
    <div className="bg-white shadow-lg rounded-lg p-3">
      <div className="flex flex-row justify-between">
        <h3 className="font-bold text-xl">
          When is the community most active?
        </h3>
        <div className="flex flex-row space-x-3">
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
