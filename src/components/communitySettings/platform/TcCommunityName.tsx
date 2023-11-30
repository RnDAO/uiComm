import React from 'react';
import TcText from '../../shared/TcText';
import TcAvatar from '../../shared/TcAvatar';
import moment from 'moment';
import { IPlatformProps } from '../../../utils/interfaces';
import { MdGroups } from 'react-icons/md';

interface TccommunityName {
  platform: IPlatformProps | null;
}

function TcCommunityName({ platform }: TccommunityName) {
  return (
    <div className="flex justify-start space-x-4 items-center py-3">
      <TcAvatar data-testid="tc-avatar">
        <MdGroups />
      </TcAvatar>
      <div className="flex flex-col">
        <TcText text={platform?.metadata?.name} variant="body1" />
        <TcText
          text={`Connected since ${moment(platform?.connectedAt).format(
            'D MMM YYYY'
          )}`}
          variant="body2"
        />
      </div>
    </div>
  );
}

export default TcCommunityName;
