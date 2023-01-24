import { Popover, TextField } from '@mui/material';
import React, { useState } from 'react';
import { GoGlobe } from 'react-icons/go';

import momentTZ from 'moment-timezone';
import moment from 'moment';
import 'moment-timezone';

// let defaultTimeZone = momentTZ.tz.guess();
const timeZonesList = momentTZ.tz.names();

type IProps = {
  selectedZone: string;
  handleSelectedZone: (zone: string) => void;
};

const ZonePicker = ({ selectedZone,handleSelectedZone }: IProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  // let [selectedZone, setSelectedZone] = useState(defaultTimeZone);

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
    <div className="flex flex-row w-1/2 md:w-auto bg-gray-background px-3 py-1 mt-2 md:mt-0 items-center rounded-md">
      <GoGlobe size={20} className="mr-3 text-lite-gray" />
      <button
        aria-describedby={id}
        onClick={handleClick}
        className="hover:bg-lite active:bg-white px-1 rounded-md"
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
        <div className="h-64 overflow-scroll w-full">
          <div className="bg-white sticky top-0 p-3">
            <TextField
              id="outlined-basic"
              placeholder="Search"
              size="small"
              className="w-full sticky"
              variant="outlined"
              onChange={searchZones}
            />
          </div>
          <ul className="w-full mt-2 px-3 py-1">
            {zones.length > 0 ? (
              zones.map((el) => (
                <li
                  key={el}
                  className="py-2 hover:bg-lite px-3 cursor-pointer flex w-full text-sm flex-row justify-between"
                  onClick={() => (
                    handleSelectedZone(el),
                    setAnchorEl(null),
                    setZones(timeZonesList)
                  )}
                >
                  <div>{el}</div>
                  <div className="flex flex-row">
                    <div className="text-info pr-3">
                      {moment.tz(moment(), el).format('z,Z')}
                    </div>
                    <div>{moment.tz(moment(), el).format('H a')}</div>
                  </div>
                </li>
              ))
            ) : (
              <div className="mx-auto py-12 text-gray-300 px-12 w-full text-center">
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
