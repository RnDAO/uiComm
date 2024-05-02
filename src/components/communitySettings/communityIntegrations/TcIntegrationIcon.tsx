/**
 * TcIntegrationIcon Component.
 *
 * This component is responsible for displaying the correct icon
 * based on the provided integration platform.
 *
 * The platform prop determines which icon will be rendered.
 * If the platform does not match any of the predefined platforms,
 * the component will render nothing.
 *
 * @component
 * @example
 * ```tsx
 * <TcIntegrationIcon platform={IntegrationPlatform.Discord} />
 * ```
 * This will render the Discord icon.
 *
 * @param {TcIntegrationIconProps} props - Props for the component.
 * @param {IntegrationPlatform} props.platform - The platform based on which the icon is rendered.
 */

import React from 'react';
import { BiLogoDiscourse } from 'react-icons/bi';
import {
  BsDiscord,
  BsQuestionCircleFill,
  BsTelegram,
  BsTwitter,
} from 'react-icons/bs';

import { IntegrationPlatform } from '../../../utils/enums';

interface ITcIntegrationIconProps {
  platform: IntegrationPlatform;
  size: number;
}

function TcIntegrationIcon({ platform, size }: ITcIntegrationIconProps) {
  switch (platform) {
    case IntegrationPlatform.Discord:
      return <BsDiscord size={size} />;
    case IntegrationPlatform.Twitter:
      return <BsTwitter size={size} />;
    case IntegrationPlatform.Discourse:
      return <BiLogoDiscourse size={size} />;
    case IntegrationPlatform.Telegram:
      return <BsTelegram size={size} />;
    case IntegrationPlatform.Snapshot:
      return <BsQuestionCircleFill size={size} />;
    default:
      return <BsDiscord size={size} />;
  }
}

export default TcIntegrationIcon;
