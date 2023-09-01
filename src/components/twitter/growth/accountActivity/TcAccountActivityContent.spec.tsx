import React from 'react';
import { render, screen } from '@testing-library/react';
import TcAccountActivityContent from './TcAccountActivityContent';

const accountActivityMockList = [
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
];

describe('<TcAccountActivityContent />', () => {
  // Test 1: Check if the component renders correctly
  it('renders without crashing', () => {
    render(<TcAccountActivityContent />);
  });

  // Test 2: Check if the correct number of cards are rendered
  it('renders the correct number of cards', () => {
    render(<TcAccountActivityContent />);
    // Assuming all cards have the 'Accounts that engage with you' or 'Your followers' text
    const cards = screen.getAllByText(
      /Accounts that engage with you|Your followers/
    );

    expect(cards.length).toBe(accountActivityMockList.length);
  });
});
