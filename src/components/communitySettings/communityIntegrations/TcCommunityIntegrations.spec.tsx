import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import TcCommunityIntegrations from './TcCommunityIntegrations';

describe('<TcCommunityIntegrations />', () => {
  it('renders TcConnectedPlatforms component', () => {
    render(<TcCommunityIntegrations />);

    // Let's use one of the unique text or elements from TcConnectedPlatforms to check if it's rendered.
    // For instance, since we know "Discord" is a title in TcConnectedPlatforms, we can use that.
    const allPlatformTitleElements = screen.getAllByText('Discord');
    expect(allPlatformTitleElements[0]).toBeInTheDocument();
  });
});
