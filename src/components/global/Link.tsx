import React from 'react';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

type CustomLinkProps = MuiLinkProps & {
  to: string;
};

const Link: React.FC<CustomLinkProps> = ({ to, children, ...rest }) => {
  return (
    <MuiLink component="a" href={to} underline="none" {...rest}>
      {children}
    </MuiLink>
  );
};

export default Link;
