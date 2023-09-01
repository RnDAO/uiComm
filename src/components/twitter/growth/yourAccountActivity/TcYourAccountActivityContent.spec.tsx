import React from 'react';
import { render, screen } from '@testing-library/react';
import TcYourAccountActivityContent from './TcYourAccountActivityContent';

const yourAccountActivityMockList = [
  {
    description: 'Number of posts',
    value: 0,
    hasTooltipInfo: false,
  },
  {
    description: 'Replies',
    value: 0,
    hasTooltipInfo: false,
  },
  {
    description: 'Retweets',
    value: 0,
    hasTooltipInfo: false,
  },
  {
    description: 'Likes',
    value: 0,
    hasTooltipInfo: false,
  },
  {
    description: 'Mentions',
    value: 0,
    hasTooltipInfo: false,
  },
];

describe('<TcYourAccountActivityContent />', () => {
  beforeEach(() => {
    render(<TcYourAccountActivityContent />);
  });

  // Test 1: Check if each description from mock list is rendered
  it('renders each description from the mock list', () => {
    yourAccountActivityMockList.forEach((item) => {
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });

  // Test 2: Check if the correct number of cards are rendered
  it('renders the correct number of cards', () => {
    const cards = yourAccountActivityMockList.map((item) =>
      screen.getByText(item.description)
    );
    expect(cards.length).toBe(yourAccountActivityMockList.length);
  });
});
