import React from 'react';
import { BiTimeFive } from 'react-icons/bi';

import { StorageService } from '../../../../services/StorageService';
import { IUser } from '../../../../utils/types';
import TcLink from '../../../shared/TcLink';
import TcText from '../../../shared/TcText';

export default function TcAccountActivityHeader() {
  const user = StorageService.readLocalStorage<IUser>('user');
  return (
    <div className='flex flex-col-reverse md:flex-row md:items-center md:justify-between'>
      <div>
        <TcText text='Account activity' variant='h6' fontWeight='bold' />
        <div className='flex items-center space-x-1'>
          <BiTimeFive size='18px' data-testid='bi-time-five-icon' />
          <TcText
            text='Data over the last 7 days'
            variant='caption'
            fontWeight='medium'
          />
        </div>
      </div>
      <div className='flex items-center pb-4 md:pb-0'>
        <TcText text='Analyzed account:' variant='subtitle1' color='#767676' />
        {user?.twitter?.twitterUsername ? (
          <>
            <TcLink to='/settings' color='secondary' fontWeight='bold'>
              @{user?.twitter?.twitterUsername}
            </TcLink>
          </>
        ) : (
          <TcText text='None' variant='subtitle1' color='#767676' />
        )}
      </div>
    </div>
  );
}
