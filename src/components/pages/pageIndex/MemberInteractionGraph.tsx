import Image from 'next/image';
import router from 'next/router';
import React from 'react';

import TcButton from '../../shared/TcButton';
import networkGraph from '../../../assets/svg/networkGraph.svg';

export default function MemberInteractionGraph() {
  return (
    <div className='rounded-lg bg-white p-5 shadow-box'>
      <div className='flex flex-col justify-start space-x-6 pt-4 md:flex-row'>
        <div className='space-y-6 px-3 md:w-1/2'>
          <h3 className='text-xl font-bold md:text-2xl'>
            Member interactions graph
          </h3>
          <p>
            Spot value-adding members in your community in member interaction{' '}
            <br className='hidden md:flex' />
            network graph.
          </p>
        </div>
        <div className='md:pl-12'>
          <Image alt='Network graph' src={networkGraph} />
        </div>
      </div>
      <div className='mb-3 pt-6 text-center md:pt-0'>
        <TcButton
          text="Show more"
          variant='contained'
          onClick={() => {
            router.push('/membersInteraction');
          }}
          className='py-2 px-[5rem]'
        />
      </div>
    </div>
  );
}
