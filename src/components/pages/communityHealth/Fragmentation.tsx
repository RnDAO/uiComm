import React from 'react';
import GaugeChart from '../../global/GaugeChart';

import Highcharts from 'highcharts/highcharts.js';
import highchartsMore from 'highcharts/highcharts-more.js';
import solidGauge from 'highcharts/modules/solid-gauge.js';

// Initialize the Highcharts networkgraph module
// Initialize the Highcharts networkgraph module
if (typeof Highcharts === 'object') {
  highchartsMore(Highcharts);
  solidGauge(Highcharts);
}

function Fragmentation() {
  const options = {
    chart: {
      type: 'solidgauge',
    },
    title: {
      text: 'Gauge Chart',
    },
    pane: {
      center: ['50%', '85%'],
      size: '140%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: '#EEE',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc',
      },
    },
    tooltip: {
      enabled: false,
    },
    yAxis: {
      stops: [
        [0.1, '#55BF3B'],
        [0.5, '#DDDF0D'],
        [0.9, '#DF5353'],
      ],
      lineWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
        y: -70,
      },
      labels: {
        y: 16,
      },
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true,
        },
      },
    },
    series: [
      {
        name: 'Speed',
        data: [80],
        dataLabels: {
          format:
            '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/>' +
            '<span style="font-size:12px;color:silver">km/h</span></div>',
        },
      },
    ],
  };

  return (
    <div>
      <GaugeChart options={options} />{' '}
    </div>
  );
}

export default Fragmentation;
