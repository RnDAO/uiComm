import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Dialog,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import useAppStore from '../../../store/useStore';
import ChannelList from '../login/ChannelList';
import { StorageService } from '../../../services/StorageService';
import {
  IGuild,
  IGuildChannels,
  IUser,
  ISubChannels,
  IChannelWithoutId,
} from '../../../utils/types';
import { BiError } from 'react-icons/bi';
import CustomButton from '../../global/CustomButton';
import { FiRefreshCcw } from 'react-icons/fi';
import Loading from '../../global/Loading';
import { MdExpandMore } from 'react-icons/md';
import ConfirmStartProcessing from './ConfirmStartProcessing';
import clsx from 'clsx';

type IProps = {
  emitable?: boolean;
  submit?: (
    selectedChannels: { channelId: string; channelName: string }[]
  ) => unknown;
};
export default function ChannelSelection({ emitable, submit }: IProps) {
  const [open, setOpen] = useState(false);
  const [openProcessing, SetOpenProcessing] = useState(false);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [guild, setGuild] = useState<IGuild>();
  const [channels, setChannels] = useState<Array<IGuildChannels>>([]);
  const [selectedChannels, setSelectedChannels] = useState<
    Array<IChannelWithoutId>
  >([]);

  const {
    guildChannels,
    guildInfo,
    updateSelectedChannels,
    getUserGuildInfo,
    guilds,
    isRefetchLoading,
    refetchGuildChannels,
  } = useAppStore();

  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');
    if (user) {
      setGuild(user.guild);
    }
    console.log({ guildInfo });

    const activeChannles =
      guildInfo && guildInfo.selectedChannels
        ? guildInfo.selectedChannels.map(
            (channel: {
              channelId: string;
              channelName: string;
              _id: string;
            }) => {
              return channel.channelId;
            }
          )
        : [];

    const channels = guildChannels.map(
      (guild: IGuildChannels, _index: number) => {
        const selected: Record<string, boolean> = {};

        guild.subChannels.forEach((subChannel: ISubChannels) => {
          if (activeChannles.includes(subChannel.id)) {
            selected[subChannel.id] = true;
          } else {
            selected[subChannel.id] = false;
          }
        });

        return { ...guild, selected: selected };
      }
    );

    const subChannelsStatus = channels.map((channel: IGuildChannels) => {
      return channel.selected;
    });

    const selectedChannelsStatus = Object.assign({}, ...subChannelsStatus);
    let activeChannel: string[] = [];
    for (const key in selectedChannelsStatus) {
      if (selectedChannelsStatus[key]) {
        activeChannel.push(key);
      }
    }

    const result = ([] as { channelId: string; channelName: string }[]).concat(
      ...channels.map((channel: IGuildChannels) => {
        return channel.subChannels
          .filter((subChannel: ISubChannels) => {
            if (activeChannel.includes(subChannel.id)) {
              return subChannel;
            }
          })
          .map((filterdItem: ISubChannels) => {
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

        const selected = preChannel.selected ?? {};
        selected[subChannelId] = status;

        return { ...preChannel, selected };
      });
    });
  };
  const handleCheckAll = (guild: IGuildChannels, status: boolean) => {
    const selectedGuild = channels.find((channel) => channel.id === guild.id);
    if (!selectedGuild) return;

    const updatedChannels = channels.map((channel) => {
      if (channel === selectedGuild) {
        const selected = { ...channel.selected };
        Object.keys(selected).forEach((key) => (selected[key] = status));
        return { ...channel, selected };
      }
      return channel;
    });

    setChannels(updatedChannels);
  };

  const refetchChannels = () => {
    refetchGuildChannels(guild?.guildId);
  };

  const submitChannels = () => {
    const subChannelsStatus = channels.map((channel: IGuildChannels) => {
      return channel.selected;
    });

    const selectedChannelsStatus = Object.assign({}, ...subChannelsStatus);
    let activeChannel: string[] = [];
    for (const key in selectedChannelsStatus) {
      if (selectedChannelsStatus[key]) {
        activeChannel.push(key);
      }
    }

    const result = ([] as { channelId: string; channelName: string }[]).concat(
      ...channels.map((channel: IGuildChannels) => {
        return channel.subChannels
          .filter((subChannel: ISubChannels) => {
            if (
              activeChannel.includes(subChannel.id) &&
              subChannel.canReadMessageHistoryAndViewChannel
            ) {
              return subChannel;
            }
          })
          .map((filterdItem: ISubChannels) => {
            return { channelId: filterdItem.id, channelName: filterdItem.name };
          });
      })
    );

    setSelectedChannels(result);
    if (emitable) {
      if (submit) submit(result);
      setOpen(false);
    } else {
      setOpen(false);
      SetOpenProcessing(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseProcessingModal = () => {
    SetOpenProcessing(false);
  };
  const handleToProcess = () => {
    updateSelectedChannels(guild?.guildId, selectedChannels).then(
      (_res: unknown) => {
        SetOpenProcessing(false);
        getUserGuildInfo(guild?.guildId);
      }
    );
  };

  if (guilds.length === 0) {
    return (
      <div className="text-base">
        Selected channels: <b>{selectedChannels.length}</b>{' '}
        <span
          className="pl-4 text-secondary underline cursor-pointer font-bold opacity-50 pointer-events-none"
          onClick={() => setOpen(true)}
        >
          Show Channels
        </span>
        <p className="flex flex-row items-stretch text-sm text-warning-500 mt-4">
          <BiError size={24} />
          <span className="text-sm pl-2">
            There is no community connected at the moment. To be able to change
            channels, please <br /> connect your community first.
          </span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-base">
        Selected channels:{' '}
        <b>
          {guildInfo && guildInfo.isDisconnected ? 0 : selectedChannels.length}
        </b>{' '}
        <span
          className={clsx(
            'pl-4 text-secondary font-semibold underline cursor-pointer font-bold"',
            guildInfo && guildInfo.isInProgress
              ? 'pointer-events-none text-opacity-50'
              : ' text-opacity-100'
          )}
          onClick={() => setOpen(true)}
        >
          Show Channels
        </span>
      </p>
      {guildInfo && guildInfo.isInProgress ? (
        <div className="flex items-center text-base text-orange pt-4">
          <BiError size={24} className="mr-2" />
          <p className="m-0">
            We are processing data from selected channels. It might take up to 6
            hours to complete.
          </p>
        </div>
      ) : (
        ''
      )}
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
            <p className="py-4 text-sm">
              Select channels to import activity in this workspace. Please give
              Together Crew access to all selected private channels by updating
              the channels permissions in Discord. Discord permission will
              affect the channels the bot can see.
            </p>
          </div>
          <div className="border border-1 border-gray-300 px-2 md:px-4 py-4 rounded-lg max-h-[410px] overflow-y-scroll text-base">
            {isRefetchLoading ? (
              <Loading height="365px" />
            ) : (
              <div className="flex flex-col">
                <div className="block md:absolute right-12">
                  <CustomButton
                    classes={''}
                    label={'Refresh List'}
                    className="text-black border-black bg-white float-right rounded-md -top-1 font-semibold"
                    startIcon={<FiRefreshCcw />}
                    size="large"
                    variant="outlined"
                    onClick={refetchChannels}
                  />
                </div>
                {channels && channels.length > 0
                  ? channels.map((guild: IGuildChannels, index: number) => {
                      return (
                        <div className="my-2" key={index}>
                          <ChannelList
                            guild={guild}
                            showFlag={true}
                            onChange={onChange}
                            handleCheckAll={handleCheckAll}
                          />
                        </div>
                      );
                    })
                  : ''}
              </div>
            )}
          </div>
          <Accordion disableGutters defaultExpanded={true} elevation={0}>
            <AccordionSummary
              expandIcon={
                <MdExpandMore color="#37474F" size={25} fill="#37474F" />
              }
            >
              <p className="font-semibold text-md">
                How to give access to the channel you want to import?
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="pl-1 pr-4 text-left">
                <ol className="list-decimal text-sm pl-4">
                  <li>
                    Navigate to the channel you want to import on{' '}
                    <a
                      href="https://discord.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary font-semibold cursor-pointer"
                    >
                      Discord
                    </a>
                  </li>
                  <li>
                    Go to the settings for that specific channel (select the
                    wheel on the right of the channel name)
                  </li>
                  <li>
                    Select <b>Permissions</b> (left sidebar), and then in the
                    middle of the screen check <b>Advanced permissions</b>
                  </li>
                  <li>
                    With the <b>TogetherCrew Bot</b> selected, under Advanced
                    Permissions, make sure that [View channel] and [Read message
                    history] are marked as [✓]
                  </li>
                  <li>
                    Select the plus sign to the right of Roles/Members and under
                    members select <b>TogetherCrew bot</b>
                  </li>
                  <li>
                    Click on the <b>Refresh List</b> button on this window and
                    select the new channels
                  </li>
                </ol>
              </div>
            </AccordionDetails>
          </Accordion>
          <div className="flex justify-center mt-1">
            <CustomButton
              onClick={submitChannels}
              label={'Save channels'}
              classes={'bg-secondary text-white py-3 px-16 text-base'}
            />
          </div>
        </div>
      </Dialog>
      <ConfirmStartProcessing
        open={openProcessing}
        onClose={handleCloseProcessingModal}
        onSubmitProcess={handleToProcess}
      />{' '}
    </div>
  );
}

ChannelSelection.defaultProps = {
  emitable: false,
};
