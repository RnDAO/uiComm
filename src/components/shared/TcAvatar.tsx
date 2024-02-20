import { Avatar, AvatarProps } from '@mui/material';
import React from 'react';

/**
 * ITcAvatarProps interface.
 *
 * Represents the properties for the TcAvatar component.
 * It extends AvatarProps from MUI's Avatar to inherit all of its properties.
 */
type ITcAvatarProps = AvatarProps;

/**
 * `TcAvatar` functional component.
 *
 * This is a wrapper around MUI's Avatar component.
 * It can accept all the props that MUI's Avatar component can.
 *
 * @param props - The properties the component accepts. See `ITcAvatarProps`.
 * @returns A JSX element representing an Avatar with the provided properties.
 */
function TcAvatar({ ...props }: ITcAvatarProps) {
  return <Avatar {...props} />;
}

export default TcAvatar;
