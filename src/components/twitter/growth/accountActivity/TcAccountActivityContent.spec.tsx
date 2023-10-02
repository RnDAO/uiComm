import React from 'react';
import { render, screen } from '@testing-library/react';
import TcAccountActivityContent from './TcAccountActivityContent';

describe('<TcAccountActivityContent />', () => {
  // Test 1: Check if the component renders correctly
  it('renders without crashing', () => {
    render(
      <TcAccountActivityContent
        activityList={[
          {
            description: 'Accounts that engage with you',
            value: 0,
            hasTooltipInfo: true,
          },
          {
            description: 'Your followers',
            value: 0,
            hasTooltipInfo: false,
          },
        ]}
      />
    );
  });

  it('renders the correct data in cards', () => {
    render(
      <TcAccountActivityContent
        activityList={[
          {
            description: 'Accounts that engage with you',
            value: 10,
            hasTooltipInfo: true,
          },
          {
            description: 'Your followers',
            value: 20,
            hasTooltipInfo: false,
          },
        ]}
      />
    );

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(
      screen.getByText('Accounts that engage with you')
    ).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('Your followers')).toBeInTheDocument();
  });
});
