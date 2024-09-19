import React from 'react';
import { AiFillThunderbolt } from 'react-icons/ai';
import { FaDiscord } from 'react-icons/fa';
import { FaDiscourse } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaGoogleDrive } from 'react-icons/fa';
import { FaWikipediaW } from 'react-icons/fa';
import { FaTelegram, FaTwitter } from 'react-icons/fa6';
import { RiNotionFill } from 'react-icons/ri';

interface TcCommunityPlatformIconProps {
  platform: string;
  size?: number;
}

function TcCommunityPlatformIcon({
  platform,
  size = 44,
}: TcCommunityPlatformIconProps) {
  const renderIcon = () => {
    switch (platform) {
      case 'Discord':
        return <FaDiscord size={size} />;
      case 'Twitter':
        return <FaTwitter size={size} />;
      case 'Discourse':
        return <FaDiscourse size={size} />;
      case 'Telegram':
        return <FaTelegram size={size} />;
      case 'Snapshot':
        return <AiFillThunderbolt size={size} />;
      case 'Github':
        return <FaGithub size={size} />;
      case 'GDrive':
        return <FaGoogleDrive size={size} />;
      case 'Notion':
        return <RiNotionFill size={size} />;
      case 'MediaWiki':
        return <FaWikipediaW size={size} />;
      default:
        return null;
    }
  };

  return <div>{renderIcon()}</div>;
}

export default TcCommunityPlatformIcon;
