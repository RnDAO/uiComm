import React from 'react';
import { FormControl, InputLabel } from '@mui/material';
import { BsDiscord, BsTelegram } from 'react-icons/bs';

import TcSelect from '../../../shared/TcSelect';
import TcText from '../../../shared/TcText';

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

interface ITcSelectPlatformProps {
  isEdit: boolean;
}

function TcSelectPlatform({ isEdit }: ITcSelectPlatformProps) {
  return (
    <div className='flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0'>
      <div>
        <TcText
          text={`${isEdit ? 'Edit' : 'Create'} Announcement`}
          variant='h6'
          fontWeight='bold'
        />
        <TcText
          text='Select a platform, enter your public and/or private messages below, finally schedule it in and then you’re good to go!'
          variant='subtitle2'
          fontWeight='400'
          className='text-gray-400'
        />
      </div>
      <FormControl variant='filled' sx={{ minWidth: 180 }}>
        <InputLabel id='select-standard-label'>Select Platform</InputLabel>
        <TcSelect
          size='small'
          labelId='select-standard-label'
          id='select-standard-label'
          label='Platform'
          defaultValue={1}
          options={announcementsPlatforms}
        />
      </FormControl>
    </div>
  );
}

export default TcSelectPlatform;
