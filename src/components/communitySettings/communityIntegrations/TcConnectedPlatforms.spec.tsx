import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TcConnectedPlatforms from './TcConnectedPlatforms';

describe('<TcConnectedPlatforms />', () => {
  it('renders TcConnectedPlatformsItem components based on mock data', () => {
    render(<TcConnectedPlatforms />);

    // Check if the platform title from mock data is rendered
    const allPlatformTitleElements = screen.getAllByText('Discord');
    expect(allPlatformTitleElements[0]).toBeInTheDocument();

    // Check if the community name from mock data is rendered
    const communityNameElement = screen.getByText('Togethercrew');
    expect(communityNameElement).toBeInTheDocument();
  });
});
