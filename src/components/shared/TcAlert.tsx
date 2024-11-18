import React from 'react';
import { Alert, AlertProps } from '@mui/material';

/**
 * TcAlert Component
 *
 * A simple wrapper component for MUI's Alert component. It allows you to
 * use MUI Alert with the flexibility to pass any valid AlertProps.
 *
 * @param {ITcAlertProps} props - The props for the TcAlert component.
 * @returns {React.ReactElement} A React element representing the Alert component.
 */

type ITcAlertProps = AlertProps;

function TcAlert({ ...props }: ITcAlertProps) {
  return <Alert {...props} />;
}

export default TcAlert;
