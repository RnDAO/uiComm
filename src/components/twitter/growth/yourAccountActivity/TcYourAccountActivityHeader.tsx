import React from 'react';
import TcText from '../../../shared/TcText';
import { StorageService } from '../../../../services/StorageService';
import { IUser } from '../../../../utils/types';
import TcLink from '../../../shared/TcLink';

function TcYourAccountActivityHeader() {
  return (
    <div className='flex flex-col-reverse md:flex-row md:items-center md:justify-between'>
      <div className='space-y-3'>
        <TcText text='Your account activity' variant='h6' fontWeight='bold' />
        <TcText
          text='How much you engage with others'
          variant='caption'
          fontWeight='medium'
        />
      </div>
    </div>
  );
}

export default TcYourAccountActivityHeader;
