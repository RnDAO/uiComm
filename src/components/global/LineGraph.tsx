import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function LineGraph({ options }: any) {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
