import React from 'react';
import { BiTimeFive } from 'react-icons/bi';
import TcText from '../../shared/TcText';
import TcLink from '../../shared/TcLink';

export default function TcAccountActivityHeader() {
  return (
    <div className="flex justify-between items-center">
      <div>
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
      <div className="flex items-center">
        <TcText
          text="Analyzed account:"
          variant="subtitle1"
          fontWeight="medium"
        />
        <TcLink to={'/'} color="secondary" fontWeight="bold">
          @daoxyz
        </TcLink>
      </div>
    </div>
  );
}
