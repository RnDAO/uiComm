import { Paper } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import Link from '../../global/Link';
import communityhealth from '../../../assets/svg/communityhealth.svg';

function HeaderSection() {
  return (
    <Paper className='flex flex-col justify-between space-y-4 rounded-xl px-4 py-6 shadow-box md:flex-row md:px-8'>
      <div className='space-y-4 md:w-3/5'>
        <h3 className='text-xl font-bold md:text-3xl'>
          When is your community healthy?
        </h3>
        <p className='text-sm'>
          Here you will find health indicators based on our{' '}
          <Link
            target='_blank'
            to="https://rndao.mirror.xyz/F-SMj6p_jdYvrMMkR1d9Hd6YbEg39qItTKfjo-zkgqM"
            color='secondary'
            className='font-semibold'
          >
            Community Health Research.
          </Link>
        </p>
        <p className='text-sm'>
          We recommend a monthly review to prioritize areas for improvement,
          <br />
          plan strategic initiatives, and assess progress.
        </p>
      </div>
      <div className='mx-auto md:mr-12'>
        <Image src={communityhealth} alt='communityhealth' />
      </div>
    </Paper>
  );
}

export default HeaderSection;
