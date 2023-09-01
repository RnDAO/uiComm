import React from 'react';
import { render, screen } from '@testing-library/react';
import TcAudienceResponseContent from './TcAudienceResponseContent';

describe('<TcAudienceResponseContent />', () => {
  beforeEach(() => {
    render(<TcAudienceResponseContent />);
  });

  // Test 1: Check if the correct number of cards are rendered
  it('renders the correct number of cards', () => {
    const cards = screen.getAllByText(/Replies|Retweets|Likes|Mentions/);
    expect(cards.length).toBe(4); // As per your mock data, there are 4 cards
  });

  // Test 3: Check if the TcIconWithTooltip is not present for all cards (because hasTooltipInfo is false for all)
  it('does not render any tooltips', () => {
    const tooltipText = 'Followers and non-followers';
    expect(screen.queryByText(tooltipText)).not.toBeInTheDocument();
  });
});

const yourAccountActivityMockList = [
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
