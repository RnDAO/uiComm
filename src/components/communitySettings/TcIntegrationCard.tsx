import React from 'react';
import { CardProps } from '@mui/material';

import TcCard from '../shared/TcCard';

interface ITcIntegrationCardProps extends CardProps {
  children: React.ReactElement | JSX.Element;
}

function TcIntegrationCard({ children, ...props }: ITcIntegrationCardProps) {
  return (
    <TcCard
      elevation={1}
      className='h-[10rem] w-[8.75rem]'
      children={children}
      data-testid='tc-integration-card'
      {...props}
    />
  );
}

export default TcIntegrationCard;
