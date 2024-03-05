import { InputAdornment } from '@mui/material';
import moment from 'moment';
import momentTZ from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { FaGlobeAmericas } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import 'moment-timezone';

import TcButton from '../shared/TcButton';
import TcInput from '../shared/TcInput';
import TcPopover from '../shared/TcPopover';

const timeZonesList = momentTZ.tz.names();

interface ITcTimeZoneProps {
  handleZone: (zone: string) => void;
}
function TcTimeZone({ handleZone }: ITcTimeZoneProps) {
  const [activeZone, setActiveZone] = useState<string>(moment.tz.guess());

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

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

  const handleTimeZoneSelect = (timeZone: string) => {
    setActiveZone(timeZone);
    setAnchorEl(null);
    setZones(timeZonesList);
  };

  useEffect(() => {
    handleZone(activeZone);
  }, [activeZone]);

  return (
    <div className='w-full md:w-auto'>
      <TcButton
        text={activeZone}
        variant='outlined'
        sx={{
          height: '2.4rem',
        }}
        startIcon={<FaGlobeAmericas data-testid='globe-icon' />}
        aria-describedby={id}
        onClick={handleClick}
      />
      <TcPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          style: { width: 'auto' },
        }}
        content={
          <div className='px-2'>
            <div className='sticky top-0 bg-white pt-3'>
              <TcInput
                label='Search timezone'
                variant='filled'
                placeholder='Enter here...'
                sx={{
                  width: 'auto',
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MdSearch size={20} />
                    </InputAdornment>
                  ),
                }}
                onChange={searchZones}
              />
            </div>
            <ul className='h-64 w-full overflow-y-scroll px-3'>
              {zones.length > 0 ? (
                zones.map((el) => (
                  <li
                    key={el}
                    className='flex w-full cursor-pointer flex-row justify-between py-2 px-3 text-sm hover:bg-lite'
                    onClick={() => handleTimeZoneSelect(el)}
                  >
                    <div>{el}</div>
                  </li>
                ))
              ) : (
                <div className='mx-auto w-full py-12 px-12 text-center text-gray-300'>
                  Not founded
                </div>
              )}
            </ul>
          </div>
        }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      />
    </div>
  );
}

export default TcTimeZone;
