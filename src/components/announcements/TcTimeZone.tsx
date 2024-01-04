import React, { useState } from 'react';
import TcButton from '../shared/TcButton';
import { FaGlobeAmericas } from 'react-icons/fa';
import TcPopover from '../shared/TcPopover';

import momentTZ from 'moment-timezone';
import moment from 'moment';
import 'moment-timezone';
import TcInput from '../shared/TcInput';
import { InputAdornment } from '@mui/material';
import { MdSearch } from 'react-icons/md';

const timeZonesList = momentTZ.tz.names();

function TcTimeZone() {
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

  return (
    <div>
      <TcButton
        text={activeZone}
        variant="outlined"
        sx={{
          height: '2.4rem',
        }}
        startIcon={<FaGlobeAmericas />}
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
          <div className="px-2">
            <div className="bg-white sticky top-0 pt-3">
              <TcInput
                label="Search timezone"
                variant="filled"
                placeholder="Enter here..."
                sx={{
                  width: 'auto',
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdSearch size={20} />
                    </InputAdornment>
                  ),
                }}
                onChange={searchZones}
              />
            </div>
            <ul className="w-full px-3 h-64 overflow-y-scroll">
              {zones.length > 0 ? (
                zones.map((el) => (
                  <li
                    key={el}
                    className="py-2 hover:bg-lite px-3 cursor-pointer flex w-full text-sm flex-row justify-between"
                    onClick={() => handleTimeZoneSelect(el)}
                  >
                    <div>{el}</div>
                  </li>
                ))
              ) : (
                <div className="mx-auto py-12 text-gray-300 px-12 w-full text-center">
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
