import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import TcPublicMessageContainer from './TcPublicMessageContainer';
import {
  ChannelContext,
  initialChannelContextData,
} from '../../../../context/ChannelContext';
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
  const setup = () =>
    render(
      <TokenContext.Provider value={mockTokenContextValue}>
        <ChannelContext.Provider value={initialChannelContextData}>
          <TcPublicMessageContainer handlePublicAnnouncements={jest.fn()} />
        </ChannelContext.Provider>
      </TokenContext.Provider>
    );

  it('should toggle public message state and render related UI elements', async () => {
    setup();

    const switchElement = screen.getByRole('checkbox');
    fireEvent.click(switchElement);

    expect(screen.getByText(/Write message here:/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Our bot will distribute the announcement through selected channels with the required access to share the designated message./i
      )
    ).toBeInTheDocument();
  });
});
