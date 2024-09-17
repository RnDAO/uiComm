import { Alert, Box, Popover, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { FaHashtag } from 'react-icons/fa';

import TcPlatformChannelList from '../communitySettings/platform/TcPlatformChannelList';
import TcButton from '../shared/TcButton';
import { ChannelContext } from '../../context/ChannelContext';
import { calculateSelectedChannelSize } from '../../helpers/helper';

type IFilterByChannelsProps = {
  handleFetchHeatmapByChannels?: () => void;
};

const FilterByChannels = ({
  handleFetchHeatmapByChannels,
}: IFilterByChannelsProps) => {
  const channelContext = useContext(ChannelContext);

  const { selectedSubChannels } = channelContext;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedCount = calculateSelectedChannelSize(selectedSubChannels);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className='min-w-1/2 mt-2 flex flex-row items-center rounded-md bg-gray-background px-3 py-1.5 md:mt-0 md:w-auto md:py-2'>
      <FaHashtag size={20} className='mr-3 text-black' />
      <button
        aria-describedby={id}
        onClick={handleClick}
        className='rounded-md px-2 hover:bg-lite active:bg-white'
      >
        By channel ({selectedCount}){' '}
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
        <Box px={4} py={2}>
          <Typography variant='body1' fontWeight='bold' pb={1}>
            Select categories to view activity
          </Typography>
          <Box className='rounded-md border border-gray-300'>
            <TcPlatformChannelList
              refreshTrigger={false}
              disableSubChannelsByAnnouncement={false}
              channelListCustomClass='px-4 py-3'
            />
          </Box>
          <Alert severity='warning' className='mt-4 rounded-lg'>
            At least one channel needs to be selected. Please select channel.
          </Alert>
          <Box textAlign='center' pt={2}>
            <TcButton
              text='Save channels'
              variant='contained'
              className='w-full'
              disabled={selectedCount === 0}
              onClick={() => {
                if (handleFetchHeatmapByChannels) {
                  handleFetchHeatmapByChannels();
                }
                setAnchorEl(null);
              }}
            />
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default FilterByChannels;
