import React, { useEffect, useState } from 'react';
import GaugeChart from '../../global/GaugeChart';
import Highcharts from 'highcharts/highcharts.js';
import highchartsMore from 'highcharts/highcharts-more.js';
import solidGauge from 'highcharts/modules/solid-gauge.js';
import Image from 'next/image';
import enmeshed from '../../../assets/svg/enmeshed.svg';
import fragmented from '../../../assets/svg/fragmented.svg';
import { Paper } from '@mui/material';
import CommunityStatusShower from './CommunityStatusShower';
import { IFragmentationScoreResponse } from '../../../utils/interfaces';
import TipsDialog from './TipsDialog';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { FiAlertTriangle } from 'react-icons/fi';

// Initialize the Highcharts networkgraph module
if (typeof Highcharts === 'object') {
  highchartsMore(Highcharts);
  solidGauge(Highcharts);
}

interface FragmentationProps {
  scoreData: IFragmentationScoreResponse | null;
}

function Fragmentation({ scoreData }: FragmentationProps) {
  const [tipDialogOpen, setTipDialogOpen] = useState<boolean>(false);
  const [options, setOptions] = useState({
    chart: {
      type: 'gauge',
      backgroundColor: 'transparent',
      height: '300px',
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
        y: -80,
        text: 'Balanced',
      },
      labels: {
        enabled: true,
        y: 20,
        formatter: function (
          this: Highcharts.AxisLabelsFormatterContextObject
        ): string {
          if (this.isFirst) {
            return 'Too enmeshed';
          } else if (this.isLast) {
            return 'Too fragmented';
          }
          return this.value.toString();
        },
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
          min: scoreData?.fragmentationScoreRange?.minimumFragmentationScore,
          max: scoreData?.fragmentationScoreRange?.maximumFragmentationScore,
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

  const closeTipModal = () => setTipDialogOpen(false);
  const openTipModal = () => setTipDialogOpen(true);

  const enmeshedTips = [
    'Identifying common topics of conversation and/or workstreams and creating dedicated channels for them.',
    'Educating the community on the use of threads for conversations (as opposed to direct replies).',
    "Highlighting members' expertise and unique contributions (e.g., via Discord roles or community announcements) to help members with common interests and expertise find each other.",
    'Creating systems to delegate pieces of work to smaller, focused teams.',
    'Helping the community use better decision-making methods so that conversations can be concluded and not linger indefinitely.',
  ];

  const fragmentedTips = [
    'Auditing your channels and eliminating those with only a few active participants or merging those with similar topics.',
    'Creating a system for members to share updates (ideally asynchronously e.g. posts in a discord channel or short videos), so the different cliques are better informed of each other and can collaborate better.',
    'Creating a chance for members to get to know each other by completing quests or bounties together or by playing games (depending on how social or work-oriented the community is).',
    'Creating informal chats on topics of interest or more work-oriented discussions on topics that impact everyone (e.g., vision, culture, how to be a better community, etc.).',
  ];

  return (
    <>
      <Paper className="px-4 md:px-8 py-6 rounded-xl shadow-box space-y-4">
        <h3 className="text-lg font-semibold text-lite-black">Fragmentation</h3>
        <div className="flex flex-col md:flex-row md:justify-start space-y-8 md:space-x-12">
          <div className="bg-gray-hover md:w-1/3 rounded-xl overflow-hidden md:mr-12">
            <p className="text-sm px-4 p-2">Your community</p>
            {!scoreData?.fragmentationScore ? (
              <div className="flex flex-col text-center space-y-7 min-h-[320px] px-4 md:px-2">
                <div className="mt-16">
                  <FiAlertTriangle
                    className="text-error-600 mx-auto"
                    size={25}
                  />
                  <p className="text-error-600 text-sm font-semibold pt-4">
                    No data available
                  </p>
                </div>
                <span className="text-sm">
                  Please ensure that your Discord connection is properly
                  established and that the data period and channels are
                  selected.
                </span>
              </div>
            ) : (
              <>
                <GaugeChart options={options} />
                <CommunityStatusShower
                  scoreStatus={scoreData?.scoreStatus}
                  toggleTipDialog={() => openTipModal()}
                  isFragmentation={true}
                />
              </>
            )}
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
                  overwhelming. Likely, similar tasks and topics are discussed
                  by different groups with overlapping membership.
                </p>
              </div>
            </div>
            <div className="flex items-start md:items-center space-x-3 md:space-x-6">
              <Image src={fragmented} alt="fragmented" />
              <div>
                <h4 className="font-semibold">Too fragmented</h4>
                <p className="text-sm">
                  The community is very divided. It no longer feels like one
                  community but rather multiple, smaller disconnected siloes.
                  This leads to a lack of collaboration and, if not addressed,
                  diverging visions and values.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Paper>
      <TipsDialog
        headerText={
          scoreData?.scoreStatus === 1 || scoreData?.scoreStatus === 2
            ? 'Tips for making your community less fragmented'
            : 'Tips for making your community less enmeshed'
        }
        isOpen={tipDialogOpen}
        onClose={() => closeTipModal()}
      >
        <>
          {scoreData?.scoreStatus === 1 || scoreData?.scoreStatus === 2 ? (
            <>
              <div className="flex items-center justify-center space-x-4 pt-8 pb-4">
                <Image src={fragmented} alt="fragmented" />
                <HiOutlineArrowRight size={24} />
                <Image src={enmeshed} alt="enmeshed" />
              </div>
              <ul className="text-sm text-justify list-disc p-4 leading-2 space-y-5">
                {fragmentedTips.map((tip, index) => (
                  <li key={index} className="list-disc ml-4">
                    {tip}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center space-x-4 pt-8 pb-4">
                <Image src={enmeshed} alt="enmeshed" />
                <HiOutlineArrowRight size={24} />
                <Image src={fragmented} alt="fragmented" />
              </div>
              <ul className="text-sm text-justify list-disc p-4 leading-2 space-y-5">
                {enmeshedTips.map((tip, index) => (
                  <li key={index} className="list-disc ml-4">
                    {tip}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      </TipsDialog>
    </>
  );
}

export default Fragmentation;
