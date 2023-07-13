import Highcharts from 'highcharts/highcharts.js';
import highchartsMore from 'highcharts/highcharts-more.js';
import solidGauge from 'highcharts/modules/solid-gauge.js';
import HighchartsReact from 'highcharts-react-official';

// Initialize the Highcharts networkgraph module
if (typeof Highcharts === 'object') {
  highchartsMore(Highcharts);
  solidGauge(Highcharts);
}

interface GaugeChartProps {
  options: any;
}

export default function GaugeChart({ options }: GaugeChartProps) {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
