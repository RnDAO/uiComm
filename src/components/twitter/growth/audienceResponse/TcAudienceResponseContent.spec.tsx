import { render, screen } from '@testing-library/react';
import React from 'react';

import TcAudienceResponseContent from './TcAudienceResponseContent';

describe('<TcAudienceResponseContent />', () => {
  const mockData = [
    { description: 'Replies', value: 50, hasTooltipInfo: false },
    { description: 'Retweets', value: 30, hasTooltipInfo: false },
    { description: 'Likes', value: 25, hasTooltipInfo: false },
    { description: 'Mentions', value: 20, hasTooltipInfo: false },
  ];

  beforeEach(() => {
    render(<TcAudienceResponseContent data={mockData} />);
  });

  // Test 1: Check if the correct number of cards are rendered
  it('renders the correct number of cards', () => {
    const cards = screen.getAllByText(/Replies|Retweets|Likes|Mentions/);
    expect(cards.length).toBe(4);
  });

  // Test 2: Check if the TcIconWithTooltip is not present for all cards
  it('does not render any tooltips', () => {
    const tooltipText = 'Followers and non-followers';
    expect(screen.queryByText(tooltipText)).not.toBeInTheDocument();
  });
});
