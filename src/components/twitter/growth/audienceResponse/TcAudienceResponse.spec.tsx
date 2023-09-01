import React from 'react';
import { render, screen } from '@testing-library/react';
import TcAudienceResponse from './TcAudienceResponse';

describe('<TcAudienceResponse />', () => {
  beforeEach(() => {
    render(<TcAudienceResponse />);
  });

  // Test 1: Check if the "Audience response" header text from `TcAudienceResponseHeader` is rendered
  it('renders the header text correctly', () => {
    const headerText = screen.getByText('Audience response');
    expect(headerText).toBeInTheDocument();
  });

  // Test 2: Check if any one of the descriptions from `TcAudienceResponseContent` is rendered
  it('renders the content descriptions correctly', () => {
    const contentDescription = screen.getByText('Replies');
    expect(contentDescription).toBeInTheDocument();
  });

  // ... You can add more tests specific to content or other requirements if needed.
});
