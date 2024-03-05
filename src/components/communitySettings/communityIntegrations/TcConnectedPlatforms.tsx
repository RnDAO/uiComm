import React from 'react';
import TcConnectedPlatformsItem from './TcConnectedPlatformsItem';
import { IPlatformProps } from '../../../utils/interfaces';

interface IConnectedPlatformsProps {
  connectedPlatforms: IPlatformProps[];
}

function TcConnectedPlatforms({
  connectedPlatforms,
}: IConnectedPlatformsProps) {
  return (
    <div className="flex flex-row space-x-5 overflow-x-scroll md:overflow-x-hidden py-2">
      {connectedPlatforms?.map((platform: IPlatformProps, index: number) => (
        <TcConnectedPlatformsItem key={index} platform={platform} />
      ))}
    </div>
  );
}

export default TcConnectedPlatforms;
