import React, { useEffect, useState } from 'react';
import TcText from '../../shared/TcText';
import TcInput from '../../shared/TcInput';
import TcAvatar from '../../shared/TcAvatar';
import { useToken } from '../../../context/TokenContext';
import moment from 'moment';

interface TccommunityName {
  connectedAt: string;
  onNameChange: (newName: string) => void;
}

function TcCommunityName({ onNameChange, connectedAt }: TccommunityName) {
  const [communityName, setCommunityName] = useState('');
  const { community } = useToken();

  useEffect(() => {
    if (community) {
      setCommunityName(community.name);
    }
  }, [community]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityName(event.target.value);
    onNameChange(event.target.value);
  };

  return (
    <div className="flex justify-start space-x-4 items-stretch pt-2">
      <TcAvatar data-testid="tc-avatar" />
      <div className="flex flex-col space-y-2">
        <TcInput
          label="Community name"
          variant="filled"
          placeholder="Write community name"
          size="small"
          value={communityName}
          onChange={handleInputChange}
          sx={{
            minWidth: '14rem',
          }}
        />
        <TcText
          text={`Connected since ${moment(connectedAt).format('D MMM YYYY')}`}
          variant="body2"
        />
      </div>
    </div>
  );
}

export default TcCommunityName;
