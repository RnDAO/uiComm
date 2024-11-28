import React, { ReactNode } from 'react';
import { ButtonGroup, ButtonGroupProps } from '@mui/material';

interface ITcButtonGroup extends ButtonGroupProps {
  children: ReactNode;
}

function TcButtonGroup({ children, ...props }: ITcButtonGroup) {
  return <ButtonGroup {...props}>{children}</ButtonGroup>;
}

export default TcButtonGroup;
