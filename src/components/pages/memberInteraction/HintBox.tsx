import React from 'react';

export default function HintBox() {
  return (
    <div className='space-y-6 overflow-hidden rounded-xl bg-gray-hover py-7 md:px-5 lg:px-7'>
      <p className='whitespace-nowrap font-semibold'>Number of interactions</p>
      <div className='flex flex-row items-baseline justify-around'>
        <div className='text-center text-sm'>
          <div className='mx-auto h-3.5 w-3.5 rounded-full bg-secondary' />
          <span>+10</span>
        </div>
        <div className='text-center text-sm'>
          <div className='mx-auto h-5 w-5 rounded-full bg-secondary' />
          <span>+50</span>
        </div>
        <div className='text-center text-sm'>
          <div className='mx-auto h-8 w-8 rounded-full bg-secondary' />
          <span>+100</span>
        </div>
      </div>
      <div className='mx-auto space-y-2 text-center'>
        <p className='font-semibold'>Member Behaviour</p>
        <div className='ml-5 flex flex-row items-center justify-start text-center text-sm'>
          <div className='h-5 w-5 rounded-full bg-yellow-400' />
          <span className='whitespace-nowrap pl-4'>Frequent receiver</span>
        </div>
        <div className='ml-5 flex flex-row items-center justify-start text-center text-sm'>
          <div className='h-5 w-5 rounded-full bg-green' />
          <span className='whitespace-nowrap pl-4'>Frequent sender</span>
        </div>
        <div className='ml-5 flex flex-row items-center justify-start text-center text-sm'>
          <div className='h-5 w-5 rounded-full bg-secondary' />
          <span className='whitespace-nowrap pl-4'>Balanced</span>
        </div>
      </div>
    </div>
  );
}
