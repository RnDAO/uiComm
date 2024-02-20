import { render, screen } from '@testing-library/react';
import React from 'react';

import TcPublicMessageContainer from './TcPublicMessageContainer';
import { TokenContext } from '../../../../context/TokenContext';

const mockToken = {
  accessToken: 'mockAccessToken',
  refreshToken: 'mockRefreshToken',
};

const mockCommunity = {
  name: 'Test Community',
  platforms: [],
  id: 'mockCommunityId',
  users: [],
  avatarURL: 'mockAvatarURL',
};

const mockTokenContextValue = {
  token: mockToken,
  community: mockCommunity,
  updateToken: jest.fn(),
  updateCommunity: jest.fn(),
  deleteCommunity: jest.fn(),
  clearToken: jest.fn(),
};

describe('TcPublicMessageContainer', () => {
  beforeEach(() => {
    render(
      <TokenContext.Provider value={mockTokenContextValue}>
        <TcPublicMessageContainer handlePublicAnnouncements={jest.fn()} />
      </TokenContext.Provider>
    );
  });

  it('renders the "Public Message" text', () => {
    expect(screen.getByText(/Public Message/i)).toBeInTheDocument();
  });

  it('renders the message about bot distribute', () => {
    const message =
      /Our bot will distribute the announcement through selected channels with the required access to share the designated message./i;
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('renders the "Write message here:" text', () => {
    expect(screen.getByText(/Write message here:/i)).toBeInTheDocument();
  });
});
