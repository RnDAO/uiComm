import { render, screen } from '@testing-library/react';
import React from 'react';

import TcAudienceResponseHeader from './TcAudienceResponseHeader';

describe('<TcAudienceResponseHeader />', () => {
  beforeEach(() => {
    render(<TcAudienceResponseHeader />);
  });

  // Test 1: Check if the header text "Audience response" is rendered
  it('renders the header text correctly', () => {
    const headerText = screen.getByText('Audience response');
    expect(headerText).toBeInTheDocument();
  });

  // Test 2: Check if the caption text "How much others react to your activities" is rendered
  it('renders the caption text correctly', () => {
    const captionText = screen.getByText(
      'How much others react to your activities'
    );
    expect(captionText).toBeInTheDocument();
  });
});
