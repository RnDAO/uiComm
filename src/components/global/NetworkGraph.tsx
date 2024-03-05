import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph';

// Initialize the Highcharts networkgraph module
if (typeof Highcharts === 'object') {
  HighchartsNetworkgraph(Highcharts);
}

interface NetworkGraphProps {
  options: any;
}

export default function NetworkGraph({ options }: NetworkGraphProps) {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
