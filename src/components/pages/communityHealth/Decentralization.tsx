import React from 'react';
import GaugeChart from '../../global/GaugeChart';

import Highcharts from 'highcharts/highcharts.js';
import highchartsMore from 'highcharts/highcharts-more.js';
import solidGauge from 'highcharts/modules/solid-gauge.js';
import Image from 'next/image';
import centralized from '../../../assets/svg/centralized.svg';
import decentralized from '../../../assets/svg/decentralized.svg';
import { Paper } from '@mui/material';
import CommunityStatusShower from './communityStatusShower';

// Initialize the Highcharts networkgraph module
if (typeof Highcharts === 'object') {
  highchartsMore(Highcharts);
  solidGauge(Highcharts);
}

function Fragmentation() {
  const options = {
    chart: {
      type: 'gauge',
      backgroundColor: 'transparent',
    },
    title: {
      text: '',
    },
    pane: {
      center: ['50%', '75%'],
      size: '95%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#55BF3B'], // Green color at 100% position
            [0.7, '#DDDF0D'], // Yellow color at 50% position
            [1, '#DF5353'], // Red color at 0% position
          ],
        },
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
        [0, '#DF5353'], // Red color at 0% position
        [0.5, '#DDDF0D'], // Yellow color at 50% position
        [1, '#55BF3B'], // Green color at 100% position
      ],
      lineWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
        y: -70,
        text: null,
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
      },
    ],
  };

  return (
    <Paper className="px-4 md:px-8 py-6 rounded-xl shadow-box space-y-4">
      <h3 className="text-lg font-medium text-lite-black">Decentralization</h3>
      <div className="flex flex-col md:flex-row md:justify-start space-y-8 md:space-x-12">
        <div className="bg-gray-hover md:w-1/3 rounded-xl overflow-hidden md:mr-12">
          <GaugeChart options={options} />{' '}
          <CommunityStatusShower scoreStatus={-1} />
        </div>
        <div className="md:w-1/2 space-y-12">
          <p className="text-sm">
            Shows how much members are divided into informal cliques ranging
            from:
          </p>
          <div className="flex items-start md:items-center space-x-3 md:space-x-6">
            <Image src={centralized} alt="centralized" />
            <div>
              <h4 className="font-semibold">Too centralized</h4>
              <p className="text-sm">
                A few core people engage with everyone, but other members don't
                talk to each other. The community is dependent on these key
                influencers, and its vision is only shaped by their opinions.
                This allows for speed but at the cost of buy-in and hence
                resilience.
              </p>
            </div>
          </div>
          <div className="flex items-start md:items-center space-x-3 md:space-x-6">
            <Image src={decentralized} alt="decentralized" />
            <div>
              <h4 className="font-semibold">Too decentralized</h4>
              <p className="text-sm">
                Everyone regularly talks with everyone. Members manage too many
                relationships and are involved in too many divergent topics.
                Everyone’s voice is heard and included, but the community can
                struggle to define its direction and make progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default Fragmentation;
