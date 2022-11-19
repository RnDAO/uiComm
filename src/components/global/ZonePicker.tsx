import {
  Autocomplete,
  Button,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { GoGlobe } from "react-icons/go";

import momentTZ from "moment-timezone";

let defaultTimeZone = momentTZ.tz.guess();
const timeZonesList = momentTZ.tz.names();

type Props = {};

const ZonePicker = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  let [selectedZone, setSelectedZone] = useState(defaultTimeZone);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="flex flex-row items-center bg-gray-background px-3 items-center rounded-md">
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
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className="px-5 py-3 w-full">
          <TextField
            id="outlined-basic"
            placeholder="Search"
            size="small"
            className="w-full sticky"
            variant="outlined"
          />
          <ul className="h-64 w-full mt-2">
            {timeZonesList.map((el) => (
              <li
                key={el}
                className="py-2 hover:bg-lite px-3 cursor-pointer"
                onClick={() => (setSelectedZone(el), setAnchorEl(null))}
              >
                <div>{el}</div>
              </li>
            ))}
          </ul>
        </div>
      </Popover>
    </div>
  );
};

export default ZonePicker;
