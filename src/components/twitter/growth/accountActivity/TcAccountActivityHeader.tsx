import React from 'react';
import { BiTimeFive } from 'react-icons/bi';
import TcText from '../../../shared/TcText';
import TcLink from '../../../shared/TcLink';
import { StorageService } from '../../../../services/StorageService';
import { IUser } from '../../../../utils/types';

export default function TcAccountActivityHeader() {
  const user = StorageService.readLocalStorage<IUser>('user');
  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center">
      <div className="md:space-y-3">
        <TcText text="Account activity" variant="h6" fontWeight="bold" />
        <div className="flex items-center space-x-1">
          <BiTimeFive size="18px" data-testid="bi-time-five-icon" />
          <TcText
            text="Data over the last 7 days"
            variant="caption"
            fontWeight="medium"
          />
        </div>
      </div>
      <div className="flex items-center pb-4 md:pb-0">
        <TcText text="Analyzed account:" variant="subtitle1" color="#767676" />
        {user?.twitter?.twitterUsername ? (
          <>
            <TcLink to={'/settings'} color="secondary" fontWeight="bold">
              @{user?.twitter?.twitterUsername}
            </TcLink>
          </>
        ) : (
          <TcText text="None" variant="subtitle1" color="#767676" />
        )}
      </div>
    </div>
  );
}
