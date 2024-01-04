import { FormControl, InputLabel } from '@mui/material';
import React from 'react';
import TcSelect from '../../../shared/TcSelect';
import TcText from '../../../shared/TcText';
import { BsDiscord, BsTelegram } from 'react-icons/bs';

const announcementsPlatforms = [
  {
    label: 'Discord',
    value: '1',
    icon: <BsDiscord />,
  },
  {
    label: 'Telegram(TBA)',
    value: '2',
    disabled: true,
    icon: <BsTelegram />,
  },
];

function TcSelectPlatform() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
      <div>
        <TcText text="Create Announcement" variant="h6" fontWeight="bold" />
        <TcText
          text="Select a platform, enter your public and/or private messages below, finally schedule it in and then you’re good to go!"
          variant="subtitle2"
          fontWeight="400"
          className="text-gray-400"
        />
      </div>
      <FormControl variant="filled" sx={{ minWidth: 180 }}>
        <InputLabel id="select-standard-label">Select Platform</InputLabel>
        <TcSelect
          size="small"
          labelId="select-standard-label"
          id="select-standard-label"
          label="Platform"
          defaultValue={1}
          options={announcementsPlatforms}
        />
      </FormControl>
    </div>
  );
}

export default TcSelectPlatform;
