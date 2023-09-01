import React from 'react';
import { Link, LinkProps as MuiLinkProps } from '@mui/material';

interface CustomLinkProps extends MuiLinkProps {
  to: string;
}

function TcLink({ children, to, ...rest }: CustomLinkProps) {
  return (
    <Link component="a" href={to} underline="none" {...rest}>
      {children}
    </Link>
  );
}

export default TcLink;
