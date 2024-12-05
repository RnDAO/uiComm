import React from 'react';
import { render, screen } from '@testing-library/react';

import TcAudienceResponse from './TcAudienceResponse';

describe('<TcAudienceResponse />', () => {
  const mockAudience = {
    replies: 50,
    retweets: 30,
    mentions: 20,
    posts: 0,
    likes: 0,
  };

  beforeEach(() => {
    render(<TcAudienceResponse audience={mockAudience} />);
  });

  // Test 1: Check if the "Audience response" header text from `TcAudienceResponseHeader` is rendered
  it('renders the header text correctly', () => {
    const headerText = screen.getByText('Audience response');
    expect(headerText).toBeInTheDocument();
  });

  // Test 2: Check if any one of the descriptions from `TcAudienceResponseContent` is rendered
  it('renders the content descriptions correctly based on provided audience data', () => {
    // Using the data in mockAudience for validation
    const repliesDescription = screen.getByText('Replies');
    const retweetsDescription = screen.getByText('Retweets');
    const mentionsDescription = screen.getByText('Mentions');

    expect(repliesDescription).toBeInTheDocument();
    expect(retweetsDescription).toBeInTheDocument();
    expect(mentionsDescription).toBeInTheDocument();
  });
});
