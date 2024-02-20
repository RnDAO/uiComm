import { Popover, TextField } from '@mui/material';
import moment from 'moment';
import momentTZ from 'moment-timezone';
import React, { useState } from 'react';
import { GoGlobe } from 'react-icons/go';
import 'moment-timezone';

// let defaultTimeZone = momentTZ.tz.guess();
const timeZonesList = momentTZ.tz.names();

type IProps = {
  selectedZone: string;
  handleSelectedZone: (zone: string) => void;
};

const ZonePicker = ({ selectedZone, handleSelectedZone }: IProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setZones(timeZonesList);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [zones, setZones] = useState(timeZonesList);

  const searchZones = (e: { target: { value: string } }) => {
    const results = timeZonesList.filter((zone) => {
      if (e.target.value === '') {
        return timeZonesList;
      }
      return zone.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setZones(results);
  };

  return (
    <div className='min-w-1/2 mt-2 flex flex-row items-center rounded-md bg-gray-background px-3 py-1 md:mt-0 md:w-auto md:py-2'>
      <GoGlobe size={20} className='mr-3 text-lite-gray' />
      <button
        aria-describedby={id}
        onClick={handleClick}
        className='rounded-md px-2 hover:bg-lite active:bg-white'
      >
        {selectedZone}
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
          style: { width: '26rem' },
        }}
      >
        <div className='h-64 w-full overflow-scroll px-2'>
          <div className='sticky top-0 bg-white p-3'>
            <TextField
              id='outlined-basic'
              placeholder='Search'
              size='small'
              sx={{ minWidth: 'auto' }}
              className='sticky w-full'
              variant='outlined'
              onChange={searchZones}
            />
          </div>
          <ul className='mt-2 w-full px-3 py-1'>
            {zones.length > 0 ? (
              zones.map((el) => (
                <li
                  key={el}
                  className='flex w-full cursor-pointer flex-row justify-between py-2 px-3 text-sm hover:bg-lite'
                  onClick={() => (
                    handleSelectedZone(el),
                    setAnchorEl(null),
                    setZones(timeZonesList)
                  )}
                >
                  <div>{el}</div>
                  <div className='flex flex-row'>
                    <div className='pr-3 text-secondary'>
                      {moment.tz(moment(), el).format('z,Z')}
                    </div>
                    <div>{moment.tz(moment(), el).format('H a')}</div>
                  </div>
                </li>
              ))
            ) : (
              <div className='mx-auto w-full py-12 px-12 text-center text-gray-300'>
                Not founded
              </div>
            )}
          </ul>
        </div>
      </Popover>
    </div>
  );
};

export default ZonePicker;
