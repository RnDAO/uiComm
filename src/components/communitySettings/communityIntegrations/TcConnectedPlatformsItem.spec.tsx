import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TcConnectedPlatformsItem from './TcConnectedPlatformsItem';

describe('<TcConnectedPlatformsItem />', () => {
  it('renders the platform title, icon, status, and community info', () => {
    const MockIcon = () => <span>MockIcon</span>;

    render(
      <TcConnectedPlatformsItem
        icon={<MockIcon />}
        platformTitle="Mock Platform"
        status={true}
        community={{
          logo: 'https://example.com/logo.png',
          name: 'Mock Community',
        }}
      />
    );

    // Checking the platform title
    expect(screen.getByText('Mock Platform')).toBeInTheDocument();

    // Checking the icon
    expect(screen.getByText('MockIcon')).toBeInTheDocument();
  });
});
