import React from 'react';
import { Dialog, DialogProps } from '@mui/material';

/**
 * `TcDialog` Component
 *
 * A custom wrapper component for Material-UI's Dialog component, allowing you
 * to easily control the visibility of the dialog using the `open` prop.
 *
 * @param {ITcDialogProps} props - Extended Dialog properties.
 * @returns {React.ReactElement} A React element representing the Dialog component.
 */
interface ITcDialogProps extends DialogProps {
  /**
   * The children prop represents the content to be displayed inside the Dialog component.
   *
   * @type {React.ReactNode }
   */
  children: React.ReactNode;
}

function TcDialog({ children, ...props }: ITcDialogProps) {
  return <Dialog {...props}>{children}</Dialog>;
}

export default TcDialog;
