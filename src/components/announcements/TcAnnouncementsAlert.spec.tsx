import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import TcAnnouncementsAlert from './TcAnnouncementsAlert';

const mockGrantWritePermissions = jest.fn();

jest.mock('../../store/useStore', () => () => ({
  grantWritePermissions: mockGrantWritePermissions,
}));

jest.mock('../../context/TokenContext', () => ({
  useToken: () => ({
    community: {
      platforms: [
        { id: '1', disconnectedAt: null, metadata: { id: '3123141414221' } },
      ],
    },
  }),
}));

describe('TcAnnouncementsAlert', () => {
  it('renders correctly', () => {
    render(<TcAnnouncementsAlert />);
    expect(
      screen.getByText(/Announcements needs write access at the server-level/i)
    ).toBeInTheDocument();
  });
});
