import { CircularProgress, Paper } from '@mui/material';
import React from 'react';
import { BiPlus } from 'react-icons/bi';

import TcCommunityPlatformIcon from './TcCommunityPlatformIcon';
import TcDiscordIntegrationSettingsDialog from './TcDiscordIntegrationSettingsDialog';
import TcAvatar from '../../shared/TcAvatar';
import TcButton from '../../shared/TcButton';
import { conf } from '../../../configs';
import useAppStore from '../../../store/useStore';
import { IPlatformProps } from '../../../utils/interfaces';

interface TcDiscordIntgrationProps {
  platformType: string;
  isLoading: boolean;
  connectedPlatforms: IPlatformProps[];
  handleUpdateCommunityPlatoform: () => void;
}

function TcDiscordIntgration({
  platformType,
  isLoading,
  connectedPlatforms,
  handleUpdateCommunityPlatoform,
}: TcDiscordIntgrationProps) {
  const { connectNewPlatform } = useAppStore();

  const handleConnect = () => {
    connectNewPlatform(platformType);
  };

  return (
    <div className='flex items-center space-x-3 rounded-sm bg-secondary bg-opacity-5 p-5'>
      <Paper className='flex h-[6rem] w-[10rem] flex-col items-center justify-center rounded-sm py-2 shadow-none'>
        <span className='mx-auto'>
          <TcCommunityPlatformIcon platform='Discord' />
        </span>
        <div className='mx-auto w-10/12 text-center'>
          <TcButton
            text='Connect'
            variant='text'
            color='primary'
            startIcon={<BiPlus />}
            onClick={() => handleConnect()}
          />
        </div>
      </Paper>
      {isLoading ? (
        <CircularProgress size={30} />
      ) : (
        connectedPlatforms &&
        connectedPlatforms[0]?.name === 'discord' &&
        connectedPlatforms.map((platform, index) => (
          <Paper
            className='flex h-[6rem] w-[10rem] flex-col items-center justify-center space-y-1.5 overflow-hidden rounded-sm py-2 shadow-none'
            key={index}
          >
            <TcAvatar
              src={`${conf.DISCORD_CDN}icons/${platform.metadata.id}/${platform.metadata.icon}`}
              sizes='small'
            />
            <TcDiscordIntegrationSettingsDialog
              platform={platform}
              handleUpdateCommunityPlatoform={handleUpdateCommunityPlatoform}
            />
          </Paper>
        ))
      )}
    </div>
  );
}

export default TcDiscordIntgration;
