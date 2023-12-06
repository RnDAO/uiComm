import React from 'react';
import TcText from '../../shared/TcText';
import TcAvatar from '../../shared/TcAvatar';
import moment from 'moment';
import Image from 'next/image';
import {
  IDiscordModifiedCommunity,
  IPlatformProps,
} from '../../../utils/interfaces';
import { MdGroups } from 'react-icons/md';
import { useToken } from '../../../context/TokenContext';
import { conf } from '../../../configs';

interface TccommunityName {
  platform: IPlatformProps | null;
}

function TcCommunityName({ platform }: TccommunityName) {
  const { community } = useToken();

  const renderPlatformAvatar = (community: IDiscordModifiedCommunity) => {
    let activeCommunityPlatformIcon;

    if (community?.platforms) {
      activeCommunityPlatformIcon = community.platforms.find(
        (platform) => platform.disconnectedAt === null
      );
    }

    if (activeCommunityPlatformIcon && activeCommunityPlatformIcon.metadata) {
      return (
        <Image
          src={`${conf.DISCORD_CDN}icons/${activeCommunityPlatformIcon.metadata.id}/${activeCommunityPlatformIcon.metadata.icon}`}
          width="100"
          height="100"
          alt={activeCommunityPlatformIcon.metadata.name || ''}
          className="rounded-full"
        />
      );
    }

    return <MdGroups size={28} />;
  };

  return (
    <div className="flex justify-start space-x-4 items-center py-3">
      {community && community.avatarURL ? (
        <TcAvatar
          className="mx-auto"
          src={community.avatarURL}
          data-testid="tc-avatar"
        />
      ) : (
        <TcAvatar className="mx-auto" data-testid="tc-avatar">
          {community ? renderPlatformAvatar(community) : <MdGroups size={28} />}
        </TcAvatar>
      )}
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
