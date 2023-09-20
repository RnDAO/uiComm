import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TcConnectedPlatformsItem from './TcConnectedPlatformsItem';
import { PlatformStatus } from '../../../utils/enums';

describe('<TcConnectedPlatformsItem />', () => {
  it('renders the platform title, icon, status, and community info', () => {
    const MockIcon = () => <span>MockIcon</span>;

    render(
      <TcConnectedPlatformsItem
        icon={<MockIcon />}
        platformTitle="Mock Platform"
        status={PlatformStatus.Completed}
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
