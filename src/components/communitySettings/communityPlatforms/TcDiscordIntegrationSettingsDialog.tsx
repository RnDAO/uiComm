import React, { useEffect, useState } from 'react';
import { TreeItem, TreeView } from '@mui/lab';
import {
  Alert,
  AlertTitle,
  CircularProgress,
  FormControlLabel,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';
import { AiOutlineClose } from 'react-icons/ai';
import { FiRefreshCcw } from 'react-icons/fi';
import { IoClose, IoSettingsSharp } from 'react-icons/io5';
import { MdCalendarMonth, MdExpandMore } from 'react-icons/md';
import { MdChevronRight } from 'react-icons/md';
import { RiTimeLine } from 'react-icons/ri';

import TcCommunityPlatformIcon from './TcCommunityPlatformIcon';
import TcButton from '../../shared/TcButton';
import TcDatePickerPopover from '../../shared/TcDatePickerPopover';
import TcDialog from '../../shared/TcDialog';
import TcSwitch from '../../shared/TcSwitch';
import TcText from '../../shared/TcText';
import { conf } from '../../../configs';
import { Channel } from '../../../context/ChannelContext';
import { useSnackbar } from '../../../context/SnackbarContext';
import { useToken } from '../../../context/TokenContext';
import { truncateCenter } from '../../../helpers/helper';
import useAppStore from '../../../store/useStore';
import { IPlatformProps } from '../../../utils/interfaces';

export const PREMIUM_GUILDS = [
  '732892373507375164', // fuel
  '915914985140531240', // rndao
  '980858613587382322',
  '1007641784798691468',
];

interface TcDiscordIntegrationSettingsDialog {
  platform: IPlatformProps;
  handleUpdateCommunityPlatform: () => void;
}
function TcDiscordIntegrationSettingsDialog({
  platform,
  handleUpdateCommunityPlatform,
}: TcDiscordIntegrationSettingsDialog) {
  const { community, updateCommunity } = useToken();

  const { retrievePlatformProperties, patchPlatformById, deletePlatform } =
    useAppStore();
  const [isFetchingInitialData, setIsFetchingInitialData] =
    useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnalyizingDialogOpen, setIsAnalyizingDialogOpen] =
    useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [dateTimeDisplay, setDateTimeDisplay] = useState<string>('Filter Date');

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const [discordPlatformChannels, setDiscordPlatformChannels] = useState<
    Channel[]
  >([]);
  const { showMessage } = useSnackbar();

  const router = useRouter();

  useEffect(() => {
    if (router?.query?.platformId) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    const discordPlatformIsFetchingInitialData = community?.platforms
      .filter(
        (platform) =>
          platform.disconnectedAt === null && platform.name === 'discord'
      )
      .map((platform) => platform.metadata?.isFetchingInitialData)[0];

    setIsFetchingInitialData(
      discordPlatformIsFetchingInitialData
        ? discordPlatformIsFetchingInitialData
        : false
    );
  }, [community]);

  const fetchDiscordPlatformProperties = async () => {
    if (!platform) return;

    const { selectedChannels, period } = platform.metadata ?? {};

    const newDateTimeDisplay = period
      ? moment(period).format('MMM DD, YYYY')
      : 'Filter Date';

    setSelectedChannels(selectedChannels ? selectedChannels : []);

    if (dateTimeDisplay !== newDateTimeDisplay) {
      setDateTimeDisplay(newDateTimeDisplay);
    }

    if (
      !selectedDate ||
      (selectedDate && period && selectedDate.toISOString() !== period)
    ) {
      setSelectedDate(new Date(period));
    }
    setLoading(true);
    const data = await retrievePlatformProperties({
      platformId: platform.id,
    });
    setLoading(false);
    setDiscordPlatformChannels(data);
  };

  const handleRefresh = async () => {
    await fetchDiscordPlatformProperties();
  };

  useEffect(() => {
    fetchDiscordPlatformProperties();
  }, [platform]);

  const handleToggleSubChannel = (
    event: React.ChangeEvent<HTMLInputElement>,
    channelId: string
  ) => {
    event.stopPropagation();

    const currentIndex = selectedChannels.indexOf(channelId);

    const newSelectedChannel = [...selectedChannels];

    if (currentIndex === -1) {
      newSelectedChannel.push(channelId);
    } else {
      newSelectedChannel.splice(currentIndex, 1);
    }
    setSelectedChannels(newSelectedChannel);
  };

  const handleToggleAllChannelSubChannels = (
    event: React.ChangeEvent<HTMLInputElement>,
    channelId: string
  ) => {
    event.stopPropagation();
    const channel = discordPlatformChannels.find(
      (c) => c.channelId === channelId
    );

    if (!channel) return;

    let newSelectedChannels;

    const areAllSelected = channel.subChannels.every((subChannel) =>
      selectedChannels.includes(subChannel.channelId)
    );

    if (areAllSelected) {
      newSelectedChannels = selectedChannels.filter(
        (id) =>
          !channel.subChannels.some((subChannel) => subChannel.channelId === id)
      );
    } else {
      newSelectedChannels = [
        ...selectedChannels,
        ...channel.subChannels.map((subChannel) => subChannel.channelId),
      ];
      newSelectedChannels = Array.from(new Set(newSelectedChannels));
    }

    setSelectedChannels(newSelectedChannels);
  };

  const handlePatchDiscordIntegrationSettings = async () => {
    try {
      const period = PREMIUM_GUILDS.includes(platform?.metadata?.id)
        ? selectedDate?.toISOString()
        : new Date(new Date().setDate(new Date().getDate() - 90)).toISOString();

      const data = await patchPlatformById({
        id: platform.id,
        metadata: {
          selectedChannels: selectedChannels,
          period: period,
          analyzerStartedAt: new Date().toISOString(),
        },
      });

      if (data) {
        setOpen(false);
        router.replace('/community-settings', {}, { shallow: true });
        setIsAnalyizingDialogOpen(true);
      }
    } catch (error) {
      console.error('Error updating Discord integration settings:', error);
    }
  };

  const handleDisconnectDiscordIntegration = async (
    deleteType: 'hard' | 'soft'
  ) => {
    try {
      const data = await deletePlatform({ id: platform.id, deleteType });
      if (data === '') {
        setIsDeleteDialogOpen(false);
        showMessage('Platform disconnected successfully.', 'success');
        handleUpdateCommunityPlatform();

        if (community) {
          const updatedPlatforms = community.platforms.filter(
            (p) => p.id !== platform.id
          );
          const updatedCommunity = {
            ...community,
            platforms: updatedPlatforms,
          };
          updateCommunity(updatedCommunity);
        }
      }
    } catch (error) {
      console.error('Failed to disconnect Discord integration:', error);
      showMessage('Failed to disconnect. Please try again.', 'error');
    }
  };

  const datePickerOpen = Boolean(anchorEl);
  const id = open ? 'date-time-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      const fullDateTime = moment(date);
      setDateTimeDisplay(fullDateTime.format('D MMMM YYYY'));
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const resetDateFilter = () => {
    setSelectedDate(null);
    setDateTimeDisplay('Filter Date');

    setAnchorEl(null);
  };

  return (
    <>
      <div className='mx-auto w-full text-center'>
        {platform?.metadata?.name && (
          <TcButton
            text={truncateCenter(platform.metadata.name, 10)}
            className='w-10/12'
            variant='text'
            color='primary'
            startIcon={<IoSettingsSharp />}
            onClick={() => setOpen(true)}
          />
        )}
      </div>
      <TcDialog
        open={open}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '600px',
              borderRadius: '10px',
            },
          },
        }}
      >
        <div className='flex flex-col p-5'>
          <div className='absolute right-2 top-2'>
            <IoClose
              size={30}
              className='cursor-pointer'
              onClick={() => setOpen(false)}
            />
          </div>
          {isFetchingInitialData ? (
            <div className='flex h-96 items-center justify-center'>
              <div className='space-y-4 text-center'>
                <CircularProgress size={54} />
                <Typography variant='body2'>
                  We are fetching data of your server. It may take a few
                  minutes.
                </Typography>
              </div>
            </div>
          ) : (
            <>
              <div className='flex flex-col md:flex-row md:items-center md:space-x-3'>
                <TcCommunityPlatformIcon platform='Discord' />
                <div>
                  <TcText text={platform.metadata.name} variant='subtitle1' />
                  <TcText
                    text='Discord Account Settings'
                    variant='h6'
                    fontWeight='bold'
                  />
                </div>
              </div>

              {PREMIUM_GUILDS.includes(platform?.metadata?.id) ? (
                <>
                  <div>
                    <TcText
                      text='Change date period for data analysis'
                      variant='subtitle1'
                      fontWeight='bold'
                    />
                    <TcText
                      text='Choose the analysis start date (min. last 35 days for all the metrics to show properly).'
                      variant='body2'
                    />
                  </div>
                  <div className='w-1/2'>
                    <TcButton
                      className='w-full'
                      variant='outlined'
                      startIcon={<MdCalendarMonth />}
                      onClick={handleClick}
                      text={dateTimeDisplay}
                      aria-describedby={id}
                    />

                    <TcDatePickerPopover
                      open={datePickerOpen}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      selectedDate={selectedDate}
                      onDateChange={handleDateChange}
                      onResetDate={resetDateFilter}
                      disableDaysFrom={30}
                    />
                  </div>
                </>
              ) : (
                <Alert severity='info' className='my-2 rounded-sm'>
                  <AlertTitle>Analyzing Your Community Data</AlertTitle>
                  <Typography variant='body2'>
                    We're currently analyzing 90 days of your community's data.
                    This process may take up to 6 hours. Once the analysis is
                    complete, you will receive a message on Discord.
                  </Typography>
                </Alert>
              )}

              <div className='my-2 flex flex-col md:flex-row md:items-center md:justify-between'>
                <div>
                  <TcText
                    text='Change your imported channels'
                    variant='subtitle1'
                    fontWeight='bold'
                  />
                  <TcText
                    text={`Selected channels:${selectedChannels?.length}`}
                    variant='body1'
                  />
                </div>
                <TcButton
                  variant='outlined'
                  text='Permissions?'
                  onClick={() =>
                    window.open(
                      `${conf.GITBOOK_URL}features/smart-announcements#how-to-set-permissions-for-the-smart-announcements-to-work`
                    )
                  }
                />
              </div>
              <div className='h-72 max-h-72 overflow-y-scroll rounded-sm bg-gray-100'>
                <div className='flex justify-end p-1'>
                  <TcButton
                    text='Refresh'
                    variant='outlined'
                    startIcon={<FiRefreshCcw />}
                    size='small'
                    onClick={handleRefresh}
                  />
                </div>
                {loading ? (
                  <div className='h-54 flex items-center justify-center'>
                    <CircularProgress />
                  </div>
                ) : (
                  <TreeView
                    defaultCollapseIcon={<MdExpandMore />}
                    defaultExpandIcon={<MdChevronRight />}
                  >
                    {discordPlatformChannels?.map((channel, index) => (
                      <TreeItem
                        nodeId={channel.channelId}
                        label={
                          <div className='flex items-center justify-between'>
                            <TcText
                              text={channel.title}
                              variant='h6'
                              fontWeight='bold'
                            />
                            <FormControlLabel
                              onClick={(e) => e.stopPropagation()}
                              control={
                                <TcSwitch
                                  checked={channel.subChannels.every(
                                    (subChannel) =>
                                      selectedChannels?.includes(
                                        subChannel.channelId
                                      )
                                  )}
                                  disabled={channel.subChannels.some(
                                    (subChannel) =>
                                      !subChannel.canReadMessageHistoryAndViewChannel
                                  )}
                                  onChange={(e) =>
                                    handleToggleAllChannelSubChannels(
                                      e,
                                      channel.channelId
                                    )
                                  }
                                />
                              }
                              label='Enable All'
                            />
                          </div>
                        }
                        key={index}
                      >
                        {channel.subChannels.map((subChannel, index) => (
                          <TreeItem
                            nodeId={subChannel.channelId}
                            label={
                              <div className='flex items-center justify-between'>
                                <TcText
                                  text={subChannel.name}
                                  variant='subtitle1'
                                />
                                <FormControlLabel
                                  onClick={(e) => e.stopPropagation()}
                                  control={
                                    <TcSwitch
                                      checked={selectedChannels?.includes(
                                        subChannel.channelId
                                      )}
                                      disabled={
                                        !subChannel.canReadMessageHistoryAndViewChannel
                                      }
                                      onChange={(e) =>
                                        handleToggleSubChannel(
                                          e,
                                          subChannel.channelId
                                        )
                                      }
                                    />
                                  }
                                  label='Enable'
                                />
                              </div>
                            }
                            key={index}
                          />
                        ))}
                      </TreeItem>
                    ))}
                  </TreeView>
                )}
              </div>
            </>
          )}
          <div className='mt-5 flex items-center justify-between'>
            <TcButton
              className='w-1/3'
              text='Disconnect'
              variant='outlined'
              onClick={() => {
                setOpen(false);
                setIsDeleteDialogOpen(true);
              }}
            />
            <TcButton
              className='w-1/3'
              text='Confirm'
              disabled={selectedChannels?.length === 0 || isFetchingInitialData}
              variant='contained'
              onClick={() => handlePatchDiscordIntegrationSettings()}
            />
          </div>
        </div>
      </TcDialog>
      <TcDialog
        open={isDeleteDialogOpen}
        fullScreen={false}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '640px',
              borderRadius: '10px',
            },
          },
        }}
      >
        <div className='flex justify-end p-4'>
          <AiOutlineClose
            className='cursor-pointer'
            size={24}
            onClick={() => setIsDeleteDialogOpen(false)}
          />
        </div>
        <div className='px-4 text-center md:px-8'>
          <div className='mx-auto text-center md:w-4/5'>
            <TcText
              text={`Are you sure you want to disconnect ${platform?.metadata.name}?`}
              variant='h6'
            />
          </div>
          <div className='flex flex-col justify-between space-y-4 pb-8 md:flex-row md:space-y-0 md:space-x-5 md:py-12'>
            <div className='space-y-4 rounded-md px-4 py-6 shadow-xl'>
              <TcText
                text='Disconnect and delete data'
                variant='body1'
                fontWeight='bold'
              />
              <TcText
                className='text-left'
                text={
                  <span>
                    Importing activities and members will be stopped. Historical
                    activities <b>will be deleted.</b>
                  </span>
                }
                variant='body2'
              />
              <TcButton
                text='Disconnect and delete'
                variant='contained'
                className='w-full'
                onClick={() => handleDisconnectDiscordIntegration('hard')}
              />
            </div>
            <div className='space-y-4 rounded-md px-4 py-6 shadow-xl'>
              <TcText
                text='Disconnect only'
                variant='body1'
                fontWeight='bold'
              />
              <TcText
                className='text-left'
                text={
                  <span>
                    Importing activities and members will be stopped. Historical
                    activities <b>will not be affected.</b>
                  </span>
                }
                variant='body2'
              />
              <TcButton
                text='Disconnect'
                variant='contained'
                className='w-full'
                onClick={() => handleDisconnectDiscordIntegration('soft')}
              />
            </div>
          </div>
        </div>
      </TcDialog>
      <TcDialog
        open={isAnalyizingDialogOpen}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '640px',
              borderRadius: '10px',
            },
          },
        }}
      >
        <div className='flex justify-end p-4'>
          <AiOutlineClose
            className='cursor-pointer'
            size={24}
            onClick={() => setIsAnalyizingDialogOpen(false)}
          />
        </div>
        <div className='mx-auto flex w-4/5 flex-col space-y-5 p-5 text-center'>
          <div className='mx-auto w-16 rounded-full bg-[#F5F5F5] p-3'>
            <RiTimeLine className='mx-auto' size={38} />
          </div>
          <TcText text="Perfect, you're all set!" variant='h5' />
          <TcText
            text='Data import just started. It might take up to 12 hours to finish. Once it is done we will send you a message on Discord.'
            variant='body2'
          />
          <div className='py-6'>
            <TcButton
              text='I understand'
              variant='contained'
              onClick={() => setIsAnalyizingDialogOpen(false)}
            />
          </div>
        </div>
      </TcDialog>
    </>
  );
}

export default TcDiscordIntegrationSettingsDialog;
