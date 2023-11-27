import { ButtonGroup, ButtonGroupProps } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';

interface TcButtonGroup extends ButtonGroupProps {
  children: ReactNode;
}

function TcButtonGroup({ children, ...props }: TcButtonGroup) {
  return <ButtonGroup {...props}>{children}</ButtonGroup>;
}

export default TcButtonGroup;
