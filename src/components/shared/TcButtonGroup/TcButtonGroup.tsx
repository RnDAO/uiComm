import { ButtonGroup, ButtonGroupProps } from '@mui/material';
import React, { ReactNode } from 'react';

interface ITcButtonGroup extends ButtonGroupProps {
  children: ReactNode;
}

function TcButtonGroup({ children, ...props }: ITcButtonGroup) {
  return <ButtonGroup {...props}>{children}</ButtonGroup>;
}

export default TcButtonGroup;
