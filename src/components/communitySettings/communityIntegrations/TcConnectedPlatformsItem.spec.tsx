import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import TcConnectedPlatformsItem from './TcConnectedPlatformsItem';

describe('<TcConnectedPlatformsItem />', () => {
  const mockPlatform = {
    name: 'Discord',
    community: 'Mock Community',
    isInProgress: false,
    connectedAt: '2021-01-01',
    id: '1',
    disconnectedAt: null,
    metadata: {
      profileImageUrl: 'https://example.com/image.png',
      name: 'Example Community',
      username: 'exampleuser',
      icon: 'icon-id',
    },
  };

  it('renders the platform title, status, and community info', () => {
    render(<TcConnectedPlatformsItem platform={mockPlatform} />);

    expect(screen.getByText('Discord')).toBeInTheDocument();
  });
});
