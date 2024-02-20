import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import React from 'react';

type CustomLinkProps = MuiLinkProps & {
  to: string;
};

const Link: React.FC<CustomLinkProps> = ({ to, children, ...props }) => {
  return (
    <MuiLink component='a' href={to} underline='none' {...props}>
      {children}
    </MuiLink>
  );
};

export default Link;
