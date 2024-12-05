import React from 'react';
import { Tab, TabProps } from '@mui/material';

type ITcTabProps = TabProps;

function TcTab({ ...props }: ITcTabProps) {
  return <Tab {...props}></Tab>;
}

export default TcTab;
