import React from 'react';
import TcCard from '../shared/TcCard';
import { CardProps } from '@mui/material';

interface ITcIntegrationCardProps extends CardProps {
  children: React.ReactElement | JSX.Element;
}

function TcIntegrationCard({ children, ...props }: ITcIntegrationCardProps) {
  return (
    <TcCard
      elevation={1}
      className="w-[8.75rem] h-[10rem]"
      children={children}
      data-testid="tc-integration-card"
      {...props}
    />
  );
}

export default TcIntegrationCard;
