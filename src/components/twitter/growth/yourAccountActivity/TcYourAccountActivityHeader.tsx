import React from 'react';
import TcText from '../../../shared/TcText';
import { StorageService } from '../../../../services/StorageService';
import { IUser } from '../../../../utils/types';
import TcLink from '../../../shared/TcLink';

function TcYourAccountActivityHeader() {
  const user = StorageService.readLocalStorage<IUser>('user');

  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center">
      <div className="space-y-3">
        <TcText text="Your account activity" variant="h6" fontWeight="bold" />
        <TcText
          text="How much you engage with others"
          variant="caption"
          fontWeight="medium"
        />
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

export default TcYourAccountActivityHeader;
