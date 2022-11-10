import React from "react";

import Highcharts from "highcharts";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import HighchartsReact from "highcharts-react-official";

import { options } from "../../lib/data/heatmap";

if (typeof Highcharts === "object") {
  HighchartsHeatmap(Highcharts);
}

type Props = {};

const Chart = (props: Props) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <div className="flex flex-row justify-between">
        <h3 className="font-bold text-xl">
          When is the community most active?
        </h3>
        <div className="flex flex-row space-x-3">
          <div className="bg-gray-background px-3 rounded-md">Central European Time</div>
          <div className="bg-gray-background px-3 rounded-md">times</div>
        </div>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
