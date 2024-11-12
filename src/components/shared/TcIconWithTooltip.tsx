import { Tooltip } from '@mui/material';
import React from 'react';
import { MdOutlineInfo } from 'react-icons/md';

/**
 * TcIconWithTooltip Component.
 *
 * This component displays an icon wrapped with a Material-UI Tooltip. When the icon is hovered over,
 * a tooltip is displayed above the icon with the provided description.
 *
 * Props:
 * - iconComponent: The icon that will be displayed. By default, it uses `MdOutlineInfo` from `react-icons/md`.
 * - tooltipText: The text content that will be displayed inside the tooltip.
 *
 * Example:
 * ```jsx
 * <TcIconWithTooltip tooltipText="This is an info icon" />
 * <TcIconWithTooltip iconComponent={<MdHelp size="20px" color="#767676" />} tooltipText="This is a help icon" />
 * ```
 */
interface ITcIconWithTooltip {
  iconComponent?: React.ReactElement | JSX.Element;
  tooltipText: string;
}

function TcIconWithTooltip({
  iconComponent = (
    <MdOutlineInfo data-testid='icon-svg' size='20px' color='#767676' />
  ),
  tooltipText,
}: ITcIconWithTooltip) {
  return (
    <Tooltip title={tooltipText} placement='bottom'>
      <div>{iconComponent}</div>
    </Tooltip>
  );
}

export default TcIconWithTooltip;
