import React, { useEffect, useState } from 'react';
import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';
import { AiOutlineExclamationCircle, AiOutlineLeft } from 'react-icons/ai';
import Link from '../components/global/Link';
import { Paper, Popover } from '@mui/material';
import useAppStore from '../store/useStore';
import { StorageService } from '../services/StorageService';
import HintBox from '../components/pages/memberInteraction/HintBox';
import NetworkGraph from '../components/global/NetworkGraph';
import { IUser } from '../utils/types';
import SimpleBackdrop from '../components/global/LoadingBackdrop';

export default function membersInteraction() {
  const [networkGraphData, setNetworkGraphData] = useState<unknown>({
    series: [
      {
        layoutAlgorithm: {
          enableSimulation: true,
          integration: 'euler',
          linkLength: 30,
          gravitationalConstant: 0.2,
        },
        type: 'networkgraph',
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
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const { getMemberInteraction, isLoading } = useAppStore();

  useEffect(() => {
    const storedUser = StorageService.readLocalStorage<IUser>('user');
    setUser(storedUser);

    if (storedUser && storedUser.guild) {
      getMemberInteraction(storedUser.guild.guildId).then(
        (apiResponse: any[]) => {
          const transformedData = transformApiResponse(apiResponse);
          setNetworkGraphData(transformedData);
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
            width: 1,
            name: `${item.from.username} to ${item.to.username}`,
          })),
          nodes: apiResponse?.reduce((nodes: any[], item: any) => {
            const fromNode = {
              id: item.from.id,
              marker: { radius: calculateRadius(item.from.radius) },
              color:
                item.from.stats === 'BALANCED'
                  ? '#804EE1'
                  : item.from.stats === 'RECEIVER'
                  ? '#FFCB33'
                  : '#3AAE2B',
              name: item.from.username,
            };

            if (!nodes.find((node: any) => node.id === fromNode.id)) {
              nodes.push(fromNode);
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

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const open = Boolean(popoverAnchorEl);
  const popoverId = open ? 'hint-popover' : undefined;

  if (isLoading) {
    return <SimpleBackdrop />;
  }

  return (
    <>
      <SEO titleTemplate="Member Interactions" />
      <div className="flex flex-col container justify-between px-4 md:px-12 py-3">
        <Link to="/" className="mb-3">
          <div className="flex items-center text-gray-subtitle text-base hover:text-black">
            <AiOutlineLeft />
            <span className="pl-1">Community Insights</span>
          </div>
        </Link>
        <Paper className="px-4 md:px-8 py-6 rounded-xl shadow-box space-y-4 overflow-hidden">
          <h3 className="text-xl font-medium text-lite-black">
            Member interactions graph
          </h3>
          <p>Data from the last 7 days</p>
          <div className="flex flex-col md:flex-row md:items-start">
            <div className="flex-1">
              <NetworkGraph options={networkGraphData} />
            </div>
            <div className="hidden md:flex w-1/5">
              <HintBox />
            </div>
          </div>
          <div className="md:hidden float-left">
            <button onClick={handlePopoverOpen}>
              <AiOutlineExclamationCircle size={30} />
            </button>
            <Popover
              id={popoverId}
              open={open}
              anchorEl={popoverAnchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              PaperProps={{
                style: { background: 'none', boxShadow: 'none' },
              }}
            >
              <div className="p-4">
                <HintBox />
              </div>
            </Popover>
          </div>
        </Paper>
      </div>
    </>
  );
}

membersInteraction.pageLayout = defaultLayout;
