import { Tab, TabProps } from '@mui/material';
import React from 'react';

type ITcTabProps = TabProps;

function TcTab({ ...props }: ITcTabProps) {
  return <Tab {...props}></Tab>;
}

export default TcTab;
