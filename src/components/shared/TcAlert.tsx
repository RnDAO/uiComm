import { Alert, AlertProps } from '@mui/material';
import React from 'react';

/**
 * TcAlert Component
 *
 * A simple wrapper component for MUI's Alert component. It allows you to
 * use MUI Alert with the flexibility to pass any valid AlertProps.
 *
 * @param {ITcAlertProps} props - The props for the TcAlert component.
 * @returns {React.ReactElement} A React element representing the Alert component.
 */

interface ITcAlertProps extends AlertProps {}

function TcAlert({ ...rest }: ITcAlertProps) {
  return <Alert {...rest} />;
}

export default TcAlert;
