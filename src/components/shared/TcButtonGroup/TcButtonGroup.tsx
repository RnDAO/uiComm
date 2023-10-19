import { ButtonGroup, ButtonGroupProps } from '@mui/material';
import React from 'react';

interface TcButtonGroup extends ButtonGroupProps {
  children: React.ReactElement | JSX.Element;
}

function TcButtonGroup({ children, ...props }: TcButtonGroup) {
  return <ButtonGroup {...props}>{children}</ButtonGroup>;
}

export default TcButtonGroup;
