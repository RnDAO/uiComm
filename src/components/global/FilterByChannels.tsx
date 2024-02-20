import { Popover } from '@mui/material';
import React, { useContext } from 'react';
import { FaHashtag } from 'react-icons/fa';
import { BiError } from 'react-icons/bi';
import { ChannelContext } from '../../context/ChannelContext';
import TcPlatformChannelList from '../communitySettings/platform/TcPlatformChannelList';
import { calculateSelectedChannelSize } from '../../helpers/helper';
import TcButton from '../shared/TcButton';

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
    <div className="flex flex-row min-w-1/2 md:w-auto bg-gray-background px-3 mt-2 md:mt-0 items-center rounded-md py-1.5 md:py-2">
      <FaHashtag size={20} className="mr-3 text-black" />
      <button
        aria-describedby={id}
        onClick={handleClick}
        className="hover:bg-lite active:bg-white px-2 rounded-md"
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
        <div className="w-full px-8 py-4">
          <p className="text-md pb-3 font-bold">
            Select channels to view activity
          </p>
          <div className="border border-gray-300 rounded-md">
            <TcPlatformChannelList
              refreshTrigger={false}
              channelListCustomClass="px-4 py-3"
            />
          </div>
          <div className="flex items-center text-sm text-orange pt-4">
            <BiError size={18} className="mr-0.5" />
            At least one channel needs to be selected. Please select channel.
          </div>
          <div className="mx-auto pt-4 text-center">
            <TcButton
              text={'Save channels'}
              variant="contained"
              className="w-full"
              disabled={selectedCount === 0}
              onClick={() => {
                if (handleFetchHeatmapByChannels) {
                  handleFetchHeatmapByChannels();
                }
                setAnchorEl(null);
              }}
            />
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default FilterByChannels;
