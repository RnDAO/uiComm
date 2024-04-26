import { Paper } from '@mui/material';
import React from 'react';
import { BiPlus } from 'react-icons/bi';

import TcCommunityPlatformIcon from './TcCommunityPlatformIcon';
import TcButton from '../../shared/TcButton';

function TcGdriveIntgration() {
  return (
    <div className='flex items-center space-x-3 rounded-sm bg-secondary bg-opacity-5 p-5'>
      <Paper className='flex h-[6rem] w-[10rem] flex-col items-center justify-center rounded-sm py-2 shadow-none'>
        <span className='mx-auto'>
          <TcCommunityPlatformIcon platform='GDrive' />
        </span>
        <div className='mx-auto w-10/12 text-center'>
          <TcButton
            text='Connect'
            variant='text'
            color='primary'
            startIcon={<BiPlus />}
          />
        </div>
      </Paper>
    </div>
  );
}

export default TcGdriveIntgration;
