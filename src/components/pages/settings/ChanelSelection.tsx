import { Button, Checkbox, Dialog, FormControlLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import useAppStore from '../../../store/useStore';
import ChannelList from '../login/ChannelList';
import { StorageService } from '../../../services/StorageService';
import { IGuild, IUser } from '../../../utils/types';

type IProps = {
  emitable?: boolean;
  submit?: (selectedChannels: any) => any;
};
export default function ChanelSelection({ emitable, submit }: IProps) {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [guild, setGuild] = useState<IGuild>();
  const [channels, setChannels] = useState<Array<any>>([]);
  const [selectedChannels, setSelectedChannels] = useState<Array<any>>([]);

  const { guildChannels, guildInfo, updateSelectedChannels, getUserGuildInfo } =
    useAppStore();

  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');
    if (user) {
      setGuild(user.guild);
    }

    const activeChannles =
      guildInfo && guildInfo.selectedChannels
        ? guildInfo.selectedChannels.map((channel: any) => {
            return channel.channelId;
          })
        : [];

    const channels = guildChannels.map((guild: any, _index: any) => {
      const selected: Record<any, any> = {};

      guild.subChannels.forEach((subChannel: any) => {
        if (activeChannles.includes(subChannel.id)) {
          selected[subChannel.id] = true;
        } else {
          selected[subChannel.id] = false;
        }
      });

      return { ...guild, selected: selected };
    });

    const subChannelsStatus = channels.map((channel: any) => {
      return channel.selected;
    });

    const selectedChannelsStatus = Object.assign({}, ...subChannelsStatus);
    let activeChannel: string[] = [];
    for (const key in selectedChannelsStatus) {
      if (selectedChannelsStatus[key]) {
        activeChannel.push(key);
      }
    }

    const result = [].concat(
      ...channels.map((channel: any) => {
        return channel.subChannels
          .filter((subChannel: any) => {
            if (activeChannel.includes(subChannel.id)) {
              return subChannel;
            }
          })
          .map((filterdItem: any) => {
            return { channelId: filterdItem.id, channelName: filterdItem.name };
          });
      })
    );
    setSelectedChannels(result);

    setChannels(channels);
  }, [guildChannels]);

  const onChange = (
    channelId: string,
    subChannelId: string,
    status: boolean
  ) => {
    setChannels((preChannels) => {
      return preChannels.map((preChannel) => {
        if (preChannel.id !== channelId) return preChannel;

        const selected = preChannel.selected;
        selected[subChannelId] = status;

        return { ...preChannel, selected };
      });
    });
  };
  const handleCheckAll = (guild: any, status: boolean) => {
    const selectedGuild: any = channels.filter(
      (channel: any) => channel.id === guild.id
    )[0].id;

    setChannels((preChannels) => {
      return preChannels.map((preChannel) => {
        if (selectedGuild === preChannel.id) {
          Object.keys(preChannel.selected).forEach((key: any) => {
            preChannel.selected[key] = status;
          });
        }
        return preChannel;
      });
    });
  };

  const submitChannels = () => {
    const subChannelsStatus = channels.map((channel: any) => {
      return channel.selected;
    });

    const selectedChannelsStatus = Object.assign({}, ...subChannelsStatus);
    let activeChannel: string[] = [];
    for (const key in selectedChannelsStatus) {
      if (selectedChannelsStatus[key]) {
        activeChannel.push(key);
      }
    }

    const result = [].concat(
      ...channels.map((channel: any) => {
        return channel.subChannels
          .filter((subChannel: any) => {
            if (activeChannel.includes(subChannel.id)) {
              return subChannel;
            }
          })
          .map((filterdItem: any) => {
            return { channelId: filterdItem.id, channelName: filterdItem.name };
          });
      })
    );
    setSelectedChannels(result);
    if (emitable) {
      if (submit) submit(result);
      setOpen(false);
    } else {
      updateSelectedChannels(guild?.guildId, result).then((_res: any) => {
        setOpen(false);
        getUserGuildInfo(guild?.guildId);
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <p className="text-base">
        Selected channels: <b>{selectedChannels.length}</b>{' '}
        <span
          className="pl-4 text-secondary underline cursor-pointer font-bold"
          onClick={() => setOpen(true)}
        >
          Show Channels
        </span>
      </p>
      <Dialog
        fullWidth={fullWidth}
        open={open}
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start',
            verticalAlign: 'top',
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '650px',
              borderRadius: '10px',
            },
          },
        }}
        onClose={handleClose}
      >
        <div className="p-4">
          <div>
            <div className="flex flex-row justify-between md:items-center cursor-pointer">
              <h3 className="font-bold text-xl">
                Import activities from channels
              </h3>
              <IoClose size={30} onClick={handleClose} />
            </div>
            <p className="py-4 text-base">
              Select channels to import activity in this workspace. Please give
              Together Crew access to all selected private channels by updating
              the channels permissions in Discord. Discord permission will
              affect the channels the bot can see.
            </p>
          </div>
          <div className="border border-1 border-gray-300 px-4 py-4 rounded-lg max-h-[410px] overflow-y-scroll text-base">
            <div>
              {channels && channels.length > 0
                ? channels.map((guild: any, index: any) => {
                    return (
                      <ChannelList
                        guild={guild}
                        key={index}
                        onChange={onChange}
                        handleCheckAll={handleCheckAll}
                      />
                    );
                  })
                : ''}
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <Button
              className="bg-secondary text-white py-3 px-16 text-base"
              onClick={submitChannels}
            >
              Save channels
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

ChanelSelection.defaultProps = {
  emitable: false,
};
