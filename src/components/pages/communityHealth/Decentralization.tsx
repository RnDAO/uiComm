import React, { useEffect, useState } from 'react';
import GaugeChart from '../../global/GaugeChart';
import Highcharts from 'highcharts/highcharts.js';
import highchartsMore from 'highcharts/highcharts-more.js';
import solidGauge from 'highcharts/modules/solid-gauge.js';
import Image from 'next/image';
import centralized from '../../../assets/svg/centralized.svg';
import decentralized from '../../../assets/svg/decentralized.svg';
import { Paper } from '@mui/material';
import CommunityStatusShower from './CommunityStatusShower';
import { IDecentralisationScoreResponse } from '../../../utils/interfaces';
import TipsDialog from './TipsDialog';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { FiAlertTriangle } from 'react-icons/fi';

// Initialize the Highcharts networkgraph module
if (typeof Highcharts === 'object') {
  highchartsMore(Highcharts);
  solidGauge(Highcharts);
}

interface DecentralizationProps {
  scoreData: IDecentralisationScoreResponse | null;
}

function Decentralization({ scoreData }: DecentralizationProps) {
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
      size: '100%',
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
            return 'Too centralized';
          } else if (this.isLast) {
            return 'Too decentralized';
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
    if (scoreData && scoreData.decentralisationScore !== null) {
      // Update series data
      const updatedOptions = {
        ...options,
        yAxis: {
          ...options.yAxis,
          min: scoreData?.decentralisationScoreRange
            ?.minimumDecentralisationScore,
          max: scoreData?.decentralisationScoreRange
            ?.maximumDecentralisationScore,
        },
        series: [
          {
            data: [parseFloat(scoreData.decentralisationScore.toFixed(0)) || 0],
            dataLabels: {
              enabled: true,
              formatter: function (
                this: Highcharts.AxisLabelsFormatterContextObject
              ): string {
                return `${parseFloat(
                  scoreData.decentralisationScore.toFixed(0)
                )} / ${
                  scoreData.decentralisationScoreRange
                    .maximumDecentralisationScore
                }`;
              },
            },
          },
        ],
      };
      setOptions(updatedOptions);
    }
  }, [scoreData]);

  const closeTipModal = () => setTipDialogOpen(false);
  const openTipModal = () => setTipDialogOpen(true);

  const centralizedTips = [
    'Rotate who leads the onboarding call, AMAs, and other meetings to give different members a chance to build more connections and hence influence.',
    'Provide facilitation training for key influencers (and others) and/or offer a bounty for facilitators in the community to bring members together.',
    'Create a channel where members can share their work and/or give gratitude to help members learn about each other and build connections.',
    'Set a weekly reminder in your calendar to publicly ask less vocal members about their opinion.',
    'Frequently tell members that their opinions are welcomed and celebrate them when they share feedback.',
    "Create a guideline to reply to comments by first understanding the other's perspective and only after arguing/explaining one's point. Host a training/workshop on the topic to upskill members and signal importance.",
  ];
  const decentralizedTips = [
    'Appoint leads by giving promising members a moderation/facilitator role and task them to guide discussions in specific topics and serve as point-of-contact. (Leads can also be informally appointed by having them volunteer to facilitate)',
    'Role or token gate certain channels to limit discussions among a smaller set of members (if desired, you can still allow members to opt-in following a permissionless process).',
    'Consider forming more (clearly defined) working groups, and appoint coordinators/facilitators for each.',
    'Audit your channel structure and see if you can split channels up.',
    'In onboarding calls and other forums, praise those who take responsibility for a specific area and help them emerge as (local) leaders.',
    'Enforce stricter moderation of content by limiting what content can be shared in which channel and how often.',
  ];

  return (
    <>
      <Paper className="px-4 md:px-8 py-6 rounded-xl shadow-box space-y-4">
        <h3 className="text-lg font-semibold text-lite-black">
          Decentralization
        </h3>
        <div className="flex flex-col md:flex-row md:justify-start space-y-8 md:space-x-12">
          <div className="bg-gray-hover md:w-1/3 rounded-xl overflow-hidden md:mr-12">
            <p className="text-sm px-4 p-2">Your community</p>
            {!scoreData?.decentralisationScore ? (
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
                  isFragmentation={false}
                />
              </>
            )}
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
                  A few core people engage with everyone, but other members
                  don't talk to each other. The community is dependent on these
                  key influencers, and its vision is only shaped by their
                  opinions. This allows for speed but at the cost of buy-in and
                  hence resilience.
                </p>
              </div>
            </div>
            <div className="flex items-start md:items-center space-x-3 md:space-x-6">
              <Image src={decentralized} alt="decentralized" />
              <div>
                <h4 className="font-semibold">Too decentralized</h4>
                <p className="text-sm">
                  Everyone regularly talks with everyone. Members manage too
                  many relationships and are involved in too many divergent
                  topics. Everyone’s voice is heard and included, but the
                  community can struggle to define its direction and make
                  progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Paper>
      <TipsDialog
        headerText={
          scoreData?.scoreStatus === -1 || scoreData?.scoreStatus === -2
            ? 'Tips for decentralizing'
            : 'Tips for centralizing'
        }
        isOpen={tipDialogOpen}
        onClose={() => closeTipModal()}
      >
        <>
          {scoreData?.scoreStatus === 1 || scoreData?.scoreStatus === 2 ? (
            <>
              <div className="flex items-center justify-center space-x-4 pt-8 pb-4">
                <Image src={decentralized} alt="decentralized" />
                <HiOutlineArrowRight size={24} />
                <Image src={centralized} alt="centralized" />
              </div>
              <ul className="text-sm text-justify list-disc p-4 leading-2 space-y-5">
                {decentralizedTips.map((tip, index) => (
                  <li key={index} className="list-disc ml-4">
                    {tip}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center space-x-4 pt-8 pb-4">
                <Image src={centralized} alt="centralized" />
                <HiOutlineArrowRight size={24} />
                <Image src={decentralized} alt="decentralized" />
              </div>
              <ul className="text-sm text-justify list-disc p-4 leading-2 space-y-5">
                {centralizedTips.map((tip, index) => (
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

export default Decentralization;
