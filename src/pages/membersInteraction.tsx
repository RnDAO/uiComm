import React, { useEffect, useState } from 'react';
import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';
import { AiOutlineLeft } from 'react-icons/ai';
import Link from '../components/global/Link';
import { Paper } from '@mui/material';
import useAppStore from '../store/useStore';
import { StorageService } from '../services/StorageService';
import HintBox from '../components/pages/memberInteraction/HintBox';
import NetworkGraph from '../components/global/NetworkGraph';
import { IUser } from '../utils/types';

interface NetworkGraphSeries extends Highcharts.SeriesOptions {
  type: 'networkgraph';
  layoutAlgorithm?: {
    enableSimulation?: boolean;
    integration?: 'verlet' | 'euler';
    linkLength?: number;
    gravitationalConstant?: number;
  };
  data: {
    from: any;
    to: any;
    width: any;
  }[];
  nodes: any[];
}

export default function membersInteraction() {
  const [networkGrapData, setNetworkGrapData] = useState<unknown>({
    series: [
      {
        type: 'networkgraph',
        layoutAlgorithm: {
          enableSimulation: true,
          integration: 'euler',
          linkLength: 150,
          gravitationalConstant: 0.2,
        },
        data: [],
        nodes: [],
      },
    ],
    plotOptions: {
      networkgraph: {
        node: {
          color: 'gray',
        },
      },
    },
    title: {
      text: '',
    },
  });

  const [user, setUser] = useState<IUser | undefined>();

  const { getMemberInteraction } = useAppStore();

  useEffect(() => {
    const storedUser = StorageService.readLocalStorage<IUser>('user');
    setUser(storedUser);

    if (storedUser && storedUser.guild) {
      getMemberInteraction(storedUser.guild.guildId).then(
        (apiResponse: any[]) => {
          const transformedData = transformApiResponse(apiResponse);
          setNetworkGrapData(transformedData);
        }
      );
    }
  }, []);

  const transformApiResponse = (apiResponse: any[]) => {
    const transformedData = {
      series: [
        {
          type: 'networkgraph',
          data: apiResponse?.map((item: any) => ({
            from: item.from.id,
            to: item.to.id,
            width: calculateWidth(item.width),
            name: `${item.from.username} to ${item.to.username}`,
          })),
          nodes: apiResponse?.reduce((nodes: any[], item: any) => {
            const fromNode = {
              id: item.from.id,
              marker: { radius: calculateRadius(item.from.radius) },
              color: '#FFCB33',
              name: item.from.username,
            };
            const toNode = {
              id: item.to.id,
              marker: { radius: calculateRadius(item.to.radius) },
              color: '#804EE1',
              name: item.to.username,
            };

            if (!nodes.find((node: any) => node.id === fromNode.id)) {
              nodes.push(fromNode);
            }
            if (!nodes.find((node: any) => node.id === toNode.id)) {
              nodes.push(toNode);
            }
            return nodes;
          }, []),
        },
      ],
      plotOptions: {
        networkgraph: {
          node: {
            color: 'gray',
          },
          layout: 'force',
          initialPositions: 'random',
          animation: false,
        },
      },
      tooltip: {
        enabled: true,
        formatter(this: Highcharts.TooltipFormatterContextObject): string {
          return `<div>Username: ${this.point.name}</div>`;
        },
      },
      title: {
        text: '',
      },
    };

    return transformedData;
  };

  const calculateRadius = (radius: number) => {
    if (radius >= 0 && radius <= 10) {
      return 7;
    } else if (radius >= 11 && radius <= 50) {
      return 10;
    } else {
      return 17;
    }
  };

  const calculateWidth = (value: number) => {
    if (value >= 1 && value <= 10) {
      return 1;
    } else if (value >= 11 && value <= 15) {
      return 2;
    } else {
      return 4;
    }
  };

  return (
    <>
      <SEO titleTemplate="Member interactions" />
      <div className="flex flex-col container justify-between px-4 md:px-12 py-3">
        <Link to="/" className="mb-3">
          <div className="flex items-center text-gray-subtitle text-base hover:text-black">
            <AiOutlineLeft />
            <span className="pl-1">Community Insights</span>
          </div>
        </Link>
        <Paper className="px-4 md:px-8 py-6 rounded-xl shadow-box space-y-4">
          <h3 className="text-xl font-medium text-lite-black">
            Member interactions graph
          </h3>
          <p>Data from the last 7 days</p>
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
              <NetworkGraph options={networkGrapData} />
            </div>
            <div className="hidden md:flex w-1/5">
              <HintBox />
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
}

membersInteraction.pageLayout = defaultLayout;
