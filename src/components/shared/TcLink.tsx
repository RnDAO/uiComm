/**
 * TcLink Component
 *
 * This component serves as a wrapper around the MUI's Link component with custom properties.
 * It's designed to provide a standardized link appearance and behavior throughout the application.
 *
 * @component
 *
 * @param {object} props - The properties object.
 * @param {ReactNode} props.children - The content of the link (e.g., text, icons).
 * @param {string} props.to - The URL that the link should point to.
 * @param {...MuiLinkProps} rest - The rest of the properties that can be passed to the MUI Link component.
 *
 * @returns {ReactElement} The TcLink component.
 *
 * @example
 * // Usage example:
 * <TcLink to="https://www.example.com">Visit Example</TcLink>
 */

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
