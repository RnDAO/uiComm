import React from 'react';
import TcCard from '../shared/TcCard';

interface ITcIntegrationCardProps {
  children: React.ReactElement | JSX.Element;
}

function TcIntegrationCard({ children }: ITcIntegrationCardProps) {
  return (
    <TcCard
      elevation={1}
      className="w-[8.75rem] h-[10rem]"
      children={children}
      data-testid="tc-integration-card"
    />
  );
}

export default TcIntegrationCard;
