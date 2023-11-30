import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TcCommunityListItems from './TcCommunityListItems';
import { ICommunity } from '../../../utils/interfaces';

describe('TcCommunityListItems', () => {
  const mockCommunities: ICommunity[] = [
    {
      id: '1',
      name: 'Community 1',
      platforms: ['platform1', 'platform2'],
      users: ['user1', 'user2'],
      avatarURL: 'url1',
    },
    {
      id: '2',
      name: 'Community 2',
      platforms: ['platform3', 'platform4'],
      users: ['user3', 'user4'],
      avatarURL: 'url2',
    },
  ];

  const onSelectCommunityMock = jest.fn();

  it('renders community items correctly', () => {
    render(
      <TcCommunityListItems
        communities={mockCommunities}
        onSelectCommunity={onSelectCommunityMock}
      />
    );
    expect(screen.getByText('Community 1')).toBeInTheDocument();
    expect(screen.getByText('Community 2')).toBeInTheDocument();
  });

  it('calls onSelectCommunity when a community is clicked', () => {
    render(
      <TcCommunityListItems
        communities={mockCommunities}
        onSelectCommunity={onSelectCommunityMock}
      />
    );
    fireEvent.click(screen.getByText('Community 1'));
    expect(onSelectCommunityMock).toHaveBeenCalledWith(mockCommunities[0]);
  });

  it('displays a message when no communities are available', () => {
    render(
      <TcCommunityListItems
        communities={[]}
        onSelectCommunity={onSelectCommunityMock}
      />
    );
    expect(screen.getByText('No community exist')).toBeInTheDocument();
  });
});
