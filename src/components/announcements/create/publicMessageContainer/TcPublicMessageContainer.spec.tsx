import React from 'react';
import { render, screen } from '@testing-library/react';
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

  it('renders the "Send message to:" text', () => {
    expect(screen.getByText(/Send message to:/i)).toBeInTheDocument();
  });

  it('renders the message about bot delivery', () => {
    const message =
      /Our bot will deliver the announcement across chosen channels with the necessary access to share the specified message\./i;
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('renders the "Write message here:" text', () => {
    expect(screen.getByText(/Write message here:/i)).toBeInTheDocument();
  });

  it('renders the auto-generated safety message prompt', () => {
    const message =
      /If you don’t write a custom message then this auto-generated safety message wlll be sent out/i;
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
