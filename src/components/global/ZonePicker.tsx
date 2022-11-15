import {
  Autocomplete,
  Button,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { GoGlobe } from "react-icons/go";

import momentTZ from "moment-timezone";

let defaultTimeZone = momentTZ.tz.guess();
const timeZonesList = momentTZ.tz.names();

type Props = {};

const ZonePicker = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

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
      <button aria-describedby={id} onClick={handleClick} className="hover:bg-lite active:bg-white px-1 rounded-md">
        Central European Time
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
            className="w-full"
            variant="outlined"
          />
          <ul className="h-64 w-full mt-2">
            {timeZonesList.map((el) => (
              <li key={el} className="py-2">
                <div>{el}</div>
              </li>
            ))}
          </ul>
        </div>
      </Popover>
      {/* <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={timeZonesList}
        sx={{ width: 200 }}
        disableClearable
        defaultValue={defaultTimeZone}
        className="bg-transparent border-0 outline-0 text-lite-gray"
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input
              {...params.inputProps}
              autoFocus
              className={
                defaultTimeZone
                  ? "bg-gray-background outline-0 focus:bg-white hover:bg-lite cursor-pointer rounded-md px-2"
                  : "bg-transparent outline-0 focus:bg-white hover:bg-lite cursor-pointer rounded-md px-2"
              }
            />
          </div>
        )}
        onChange={(event, value) => (defaultTimeZone = value)}
      /> */}
    </div>
  );
};

export default ZonePicker;
