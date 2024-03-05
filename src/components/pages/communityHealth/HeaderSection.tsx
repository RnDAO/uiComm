import { Paper } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import communityhealth from '../../../assets/svg/communityhealth.svg';
import Link from '../../global/Link';

function HeaderSection() {
  return (
    <Paper className="flex flex-col md:flex-row justify-between px-4 md:px-8 py-6 rounded-xl shadow-box space-y-4">
      <div className="md:w-3/5 space-y-4">
        <h3 className="text-xl md:text-3xl font-bold">
          When is your community healthy?
        </h3>
        <p className="text-sm">
          Here you will find health indicators based on our{' '}
          <Link
            target="_blank"
            to={
              'https://rndao.mirror.xyz/F-SMj6p_jdYvrMMkR1d9Hd6YbEg39qItTKfjo-zkgqM'
            }
            color="secondary"
            className="font-semibold"
          >
            Community Health Research.
          </Link>
        </p>
        <p className="text-sm">
          We recommend a monthly review to prioritize areas for improvement,
          <br />
          plan strategic initiatives, and assess progress.
        </p>
      </div>
      <div className="md:mr-12 mx-auto">
        <Image src={communityhealth} alt="communityhealth" />
      </div>
    </Paper>
  );
}

export default HeaderSection;
