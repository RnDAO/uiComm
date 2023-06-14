import React, { useEffect, useState } from 'react';
import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';
import { AiOutlineExclamationCircle, AiOutlineLeft } from 'react-icons/ai';
import Link from '../components/global/Link';
import { Paper, Tooltip, Typography } from '@mui/material';
import FilterByChannels from '../components/global/FilterByChannels';
import useAppStore from '../store/useStore';
import * as Sentry from '@sentry/nextjs';
import { IGuildChannels, IUser } from '../utils/types';
import { StorageService } from '../services/StorageService';
import HintBox from '../components/pages/memberInteraction/HintBox';
import NetworkGraph from '../components/global/NetworkGraph';

export default function membersInteraction() {
  const mockData = {
    series: [
      {
        type: 'networkgraph',
        data: [
          {
            from: 'a',
            to: 'b',
            width: 3, // Custom weight (thickness) of the line
          },
          {
            from: 'a',
            to: 'c',
            width: 2, // Custom weight (thickness) of the line
          },
          {
            from: 'd',
            to: 'a',
            width: 2, // Custom weight (thickness) of the line
          },
          {
            from: 'd',
            to: 'c',
            width: 1, // Custom weight (thickness) of the line
          },
          {
            from: 'b',
            to: 'c',
            width: 1, // Custom weight (thickness) of the line
          },
          {
            from: 'f',
            to: 'c',
            width: 1, // Custom weight (thickness) of the line
          },
        ],
        nodes: [
          {
            id: 'a',
            marker: {
              radius: 20,
            },
            color: '#FFCB33',
          },
          {
            id: 'b',
            marker: {
              radius: 40,
            },
            color: '#3AAE2B',
          },
          {
            id: 'c',
            marker: {
              radius: 10,
            },
            color: '#804EE1',
          },
          {
            id: 'd',
            marker: {
              radius: 10,
            },
            color: '#235dd',
          },
        ],
      },
    ],
    plotOptions: {
      networkgraph: {
        node: {
          color: 'gray', // Default color for nodes
        },
      },
    },
    // Additional chart options can be configured here
    title: {
      text: '',
    },
  };

  const {
    getUserGuildInfo,
    fetchGuildChannels,
    selectedChannelsList,
    getSelectedChannelsList,
  } = useAppStore();

  const [user, setUser] = useState<IUser | null>(null);
  const [channels, setChannels] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = StorageService.readLocalStorage<IUser>('user');
      if (!storedUser) {
        return; // Exit early if there is no stored user
      }

      setUser(storedUser);

      try {
        const guildId = storedUser.guild.guildId;
        getUserGuildInfo(guildId);
        fetchGuildChannels(guildId);

        const channelsList: IGuildChannels[] | [] =
          await getSelectedChannelsList(guildId);

        if (!Array.isArray(channelsList) || channelsList.length === 0) {
          return; // Exit early if there are no selected channels
        }

        const channelIds = channelsList
          .flatMap((channel) => channel.subChannels || []) // Flatten the subChannels arrays
          .filter(Boolean) // Filter out falsy subChannels
          .map((subChannel) => subChannel.id);

        setChannels(channelIds);

        if (channelIds.length === 0) {
          return; // Exit early if there are no valid subChannels
        }
      } catch (error: unknown) {
        Sentry.captureException(error); // Handle any errors that occur
      } finally {
      }
    };

    fetchData();
  }, []);

  const handleSelectedChannels = (selectedChannels: string[]) => {
    setChannels(selectedChannels);
  };

  return (
    <>
      <SEO titleTemplate={'Member interactions'} />
      <div className="flex flex-col container justify-between px-4 md:px-12 py-3">
        <Link to="/" className="mb-3">
          <div className="flex items-center text-gray-subtitle text-base hover:text-black">
            <AiOutlineLeft />
            <span className="pl-1">Community Insights</span>
          </div>
        </Link>{' '}
        <Paper className="px-4 md:px-8 py-6 rounded-xl shadow-box space-y-4">
          <h3 className="text-xl font-medium text-lite-black">
            Member interactions graph{' '}
          </h3>{' '}
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
              <div className="flex flex-wrap">
                <FilterByChannels
                  guildChannels={selectedChannelsList}
                  filteredChannels={channels}
                  handleSelectedChannels={handleSelectedChannels}
                />
              </div>
              <NetworkGraph options={mockData} />
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
