import React from 'react';
import Collapse, { CollapseProps } from '@mui/material/Collapse';

/**
 * Custom wrapper component for MUI's Collapse component.
 *
 * @param {ITcCollapseProps} props - The props for the TcCollapse component.
 * @returns {React.ReactElement} A React element representing the Collapse component.
 */

/**
 * Interface for the props of the TcCollapse component, extending CollapseProps.
 *
 * @interface
 */
interface ITcCollapseProps extends CollapseProps {
  /**
   * The children prop represents the content to be displayed inside the Collapse component.
   *
   * @type {React.ReactElement | JSX.Element}
   */
  children: React.ReactElement | JSX.Element;
}

function TcCollapse({ children, ...props }: ITcCollapseProps) {
  return <Collapse {...props}>{children}</Collapse>;
}

export default TcCollapse;
