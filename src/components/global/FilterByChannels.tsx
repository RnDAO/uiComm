import { Popover } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaHashtag } from 'react-icons/fa';
import ChannelList from '../pages/login/ChannelList';
import { StorageService } from '../../services/StorageService';
import {
  IChannel,
  IChannelWithoutId,
  IGuild,
  ISubChannels,
  IUser,
} from '../../utils/types';
import CustomButton from './CustomButton';
import { IGuildChannels } from '../../utils/types';
import useAppStore from '../../store/useStore';
import { BiError } from 'react-icons/bi';

type IProps = {
  guildChannels: IGuildChannels[];
  filteredChannels: string[];
  handleSelectedChannels: (selectedChannels: string[]) => void;
};

const FilterByChannels = ({
  guildChannels,
  filteredChannels,
  handleSelectedChannels,
}: IProps) => {
  const { guildInfo } = useAppStore();
  const [guild, setGuild] = useState<IGuild>();
  const [channels, setChannels] = useState<Array<IGuildChannels>>([]);
  const [selectedChannels, setSelectedChannels] = useState<
    Array<IChannelWithoutId>
  >([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');
    if (user) {
      setGuild(user.guild);
    }
    let activeChannels: string[] = [];

    if (filteredChannels.length > 0) {
      activeChannels =
        guildInfo && guildInfo.selectedChannels
          ? guildInfo.selectedChannels
              .filter((channel: IChannel) => {
                return (
                  filteredChannels.includes(channel.channelId) ??
                  channel.channelId
                );
              })
              .map((channel: IChannel) => {
                return channel.channelId;
              })
          : [];
    } else {
      activeChannels =
        guildInfo && guildInfo.selectedChannels
          ? guildInfo.selectedChannels.map((channel: IChannel) => {
              return channel.channelId;
            })
          : [];
    }

    const updatedChannels = guildChannels.map(
      (guild: IGuildChannels, _index: number) => {
        const selected: Record<string, boolean> = {};

        guild.subChannels.forEach((subChannel: ISubChannels) => {
          if (activeChannels.includes(subChannel.channelId)) {
            selected[subChannel.channelId] = true;
          } else {
            selected[subChannel.channelId] = false;
          }
        });

        return { ...guild, selected };
      }
    );

    setChannels(updatedChannels);

    const result = calculateSelectedChannels(updatedChannels);
    setSelectedChannels(result);
  }, [guildChannels]);

  const onChange = (
    channelId: string,
    subChannelId: string,
    status: boolean
  ) => {
    setChannels((preChannels) => {
      return preChannels.map((preChannel) => {
        if (preChannel.channelId !== channelId) return preChannel;

        const selected = preChannel.selected ?? {};

        selected[subChannelId] = status;

        return { ...preChannel, selected };
      });
    });
  };

  const handleCheckAll = (guild: IGuildChannels, status: boolean) => {
    const selectedGuild = channels.find(
      (channel) => channel.channelId === guild.channelId
    );
    if (!selectedGuild) return;

    const updatedChannels = channels.map((channel: IGuildChannels) => {
      if (channel === selectedGuild) {
        const selected = { ...channel.selected };
        Object.keys(selected).forEach((key) => (selected[key] = status));
        return { ...channel, selected };
      }
      return channel;
    });

    setChannels(updatedChannels);
  };

  const checkSelectedProperties = (channels: IGuildChannels[]) => {
    return channels.every((channel) => {
      const selectedValues = channel.selected
        ? Object.values(channel.selected)
        : [];
      return selectedValues.every((selected) => !selected);
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const calculateSelectedChannels = (channels: IGuildChannels[]) => {
    const subChannelsStatus = channels.map((channel: IGuildChannels) => {
      return channel.selected;
    });

    const selectedChannelsStatus = Object.assign({}, ...subChannelsStatus);
    let activeChannel: string[] = [];
    if (selectedChannelsStatus) {
      for (const key in selectedChannelsStatus) {
        if (selectedChannelsStatus[key]) {
          activeChannel.push(key);
        }
      }
    }

    const result = ([] as IChannelWithoutId[]).concat(
      ...channels.map((channel: IGuildChannels) => {
        return channel.subChannels
          .filter((subChannel: ISubChannels) => {
            if (activeChannel.includes(subChannel.channelId)) {
              return subChannel;
            }
          })
          .map((filterdItem: ISubChannels) => {
            return {
              channelId: filterdItem.channelId,
              channelName: filterdItem.name,
            };
          });
      })
    );

    return result;
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="flex flex-row min-w-1/2 md:w-auto bg-gray-background px-3 mt-2 md:mt-0 items-center rounded-md py-1.5 md:py-2">
      <FaHashtag size={20} className="mr-3 text-black" />
      <button
        aria-describedby={id}
        onClick={handleClick}
        className="hover:bg-lite active:bg-white px-2 rounded-md"
      >
        By channel ({selectedChannels.length}){' '}
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: { width: '32rem' },
        }}
      >
        <div className="w-full px-8 py-4">
          <p className="text-md pb-3 font-bold">
            Select channels to view activity
          </p>
          <div className="max-h-[410px] overflow-y-scroll border border-gray-darken py-4 px-5 rounded-sm">
            {channels && channels.length > 0
              ? channels.map((guild: IGuildChannels, index: number) => {
                  return (
                    <div className="my-2" key={index}>
                      <ChannelList
                        guild={guild}
                        onChange={onChange}
                        handleCheckAll={handleCheckAll}
                      />
                    </div>
                  );
                })
              : ''}
          </div>
          <div className="flex items-center text-sm text-orange pt-4">
            <BiError size={18} className="mr-0.5" />
            At least one channel needs to be selected. Please select channel.
          </div>
          <div className="mx-auto pt-4 text-center">
            <CustomButton
              label={'Save channels'}
              classes="bg-secondary text-white mx-auto"
              onClick={() => {
                handleSelectedChannels(
                  calculateSelectedChannels(channels).map(
                    (channel) => channel.channelId
                  )
                );
              }}
              disabled={checkSelectedProperties(channels) ?? true}
            />
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default FilterByChannels;
