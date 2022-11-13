import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { GoGlobe } from "react-icons/go";

import momentTZ from "moment-timezone";

let defaultTimeZone = momentTZ.tz.guess();
const timeZonesList = momentTZ.tz.names();

type Props = {};

const ZonePicker = (props: Props) => {
  return (
    <div className="flex flex-row items-center bg-gray-background px-3 items-center rounded-md">
      <GoGlobe size={20} className="mr-3 text-lite-gray" />
      <Autocomplete
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
      />
    </div>
  );
};

export default ZonePicker;
