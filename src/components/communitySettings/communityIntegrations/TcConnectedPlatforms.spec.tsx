import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import TcConnectedPlatforms from './TcConnectedPlatforms';

// Mock the TcConnectedPlatformsItem component since it's imported and used in TcConnectedPlatforms
jest.mock('./TcConnectedPlatformsItem', () => {
  return function MockTcConnectedPlatformsItem({
    platform,
  }: {
    platform: any;
  }) {
    return (
      <div data-testid='mock-connected-platforms-item'>
        {/* Render the platform's name for testing purposes */}
        {platform.name}
      </div>
    );
  };
});

describe('TcConnectedPlatforms', () => {
  it('renders connected platforms correctly', () => {
    // Define mock data for connected platforms
    const connectedPlatforms = [
      {
        name: 'Platform 1',
        community: 'Community 1',
        isInProgress: false,
        connectedAt: '2023-01-01',
        id: '1',
        disconnectedAt: null,
        metadata: {},
      },
      {
        name: 'Platform 2',
        community: 'Community 2',
        isInProgress: true,
        connectedAt: '2023-01-02',
        id: '2',
        disconnectedAt: null,
        metadata: {},
      },
    ];

    // Render the TcConnectedPlatforms component with the mock data
    render(<TcConnectedPlatforms connectedPlatforms={connectedPlatforms} />);

    // Check if the platform names are rendered correctly
    const platform1Element = screen.getByText('Platform 1');
    const platform2Element = screen.getByText('Platform 2');

    expect(platform1Element).toBeInTheDocument();
    expect(platform2Element).toBeInTheDocument();
  });
});
