import React, { useEffect, useState } from 'react';
import GaugeChart from '../../global/GaugeChart';
import Highcharts from 'highcharts/highcharts.js';
import highchartsMore from 'highcharts/highcharts-more.js';
import solidGauge from 'highcharts/modules/solid-gauge.js';
import Image from 'next/image';
import enmeshed from '../../../assets/svg/enmeshed.svg';
import fragmented from '../../../assets/svg/fragmented.svg';
import { Paper } from '@mui/material';
import CommunityStatusShower from './communityStatusShower';
import { IFragmentationScoreResponse } from '../../../utils/interfaces';

// Initialize the Highcharts networkgraph module
if (typeof Highcharts === 'object') {
  highchartsMore(Highcharts);
  solidGauge(Highcharts);
}

interface FragmentationProps {
  scoreData: IFragmentationScoreResponse | null;
}

function Fragmentation({ scoreData }: FragmentationProps) {
  const [options, setOptions] = useState({
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
            [0.5, '#DDDF0D'], // Yellow color at 50% position
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
      min: 0, // Set the minimum value
      max: 200, // Set the maximum value
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
        data: [0],
      },
    ],
  });

  useEffect(() => {
    if (scoreData) {
      // Update series data
      const updatedOptions = {
        ...options,
        yAxis: {
          ...options.yAxis,
          min: scoreData?.fragmentationScoreRange.minimumFragmentationScore,
          max: scoreData?.fragmentationScoreRange.maximumFragmentationScore,
        },
        series: [
          {
            data: [scoreData.fragmentationScore || 0],
          },
        ],
      };
      setOptions(updatedOptions);
    }
  }, [scoreData]);

  return (
    <Paper className="px-4 md:px-8 py-6 rounded-xl shadow-box space-y-4">
      <h3 className="text-lg font-medium text-lite-black">Fragmentation</h3>
      <div className="flex flex-col md:flex-row md:justify-start space-y-8 md:space-x-12">
        <div className="bg-gray-hover md:w-1/3 rounded-xl overflow-hidden md:mr-12">
          <p className="text-sm px-4 p-2">Your community</p>
          <GaugeChart options={options} />
          <CommunityStatusShower scoreStatus={scoreData?.scoreStatus} />
        </div>
        <div className="md:w-1/2 space-y-12">
          <p className="text-sm">
            Shows how much members are divided into informal cliques as a
            continuum between:
          </p>
          <div className="flex items-start md:items-center space-x-3 md:space-x-6">
            <Image src={enmeshed} alt="enmeshed" />
            <div>
              <h4 className="font-semibold">Too enmeshed</h4>
              <p className="text-sm">
                The community is too dense and monolithic. It feels noisy and
                overwhelming. Likely, similar tasks and topics are discussed by
                different groups with overlapping membership.
              </p>
            </div>
          </div>
          <div className="flex items-start md:items-center space-x-3 md:space-x-6">
            <Image src={fragmented} alt="fragmented" />
            <div>
              <h4 className="font-semibold">Too fragmented</h4>
              <p className="text-sm">
                The community is very divided. It no longer feels like one
                community but rather multiple, smaller disconnected siloes. This
                leads to a lack of collaboration and, if not addressed,
                diverging visions and values.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default Fragmentation;
