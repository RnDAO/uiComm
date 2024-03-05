import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TcCommunityListItems from './TcCommunityListItems';
import { IDiscordModifiedCommunity } from '../../../utils/interfaces';

describe('TcCommunityListItems', () => {
  const mockCommunities: IDiscordModifiedCommunity[] = [
    {
      id: '1',
      name: 'Community 1',
      platforms: [
        {
          name: 'discord',
          metadata: {
            id: '1012430565959553145',
            icon: '889a294bb7237dc6d4206caa93e79faf',
            name: "nimatorabiv's server",
            selectedChannels: [
              '1118087567372455966',
              '1012430565959553148',
              '1124246469516460114',
              '1012430565959553149',
              '1018893637326749858',
              '1155092883565723698',
              '1155094012768825375',
            ],
            period: '2022-12-01T00:00:00.000Z',
            analyzerStartedAt: '2023-12-01T11:29:44.013Z',
          },
          disconnectedAt: null,
          id: '6569c3a12k491e542fc55b1b8',
        },
        {
          name: 'discord',
          metadata: {
            id: '10124305123959553145',
            icon: '889a29434mf7237dc6d4206caa93e79faf',
            name: "ali's server",
            selectedChannels: ['1118087567372455966', '1012430565959553148'],
            period: '2022-12-01T00:00:00.000Z',
            analyzerStartedAt: '2023-12-01T11:29:44.013Z',
          },
          disconnectedAt: null,
          id: '6569c3a1f89213542fc55b1b8',
        },
      ],
      users: ['user1', 'user2'],
      avatarURL: 'url1',
    },
    {
      id: '2',
      name: 'Community 2',
      platforms: [
        {
          name: 'discord',
          metadata: {
            id: '10124301222123959553145',
            icon: '889a29434mf7237dc6d4206caa93e79faf',
            name: "aliew's server",
            selectedChannels: ['111808213567372455966', '1012430312459553148'],
            period: '2022-12-01T00:00:00.000Z',
            analyzerStartedAt: '2023-12-01T11:29:44.013Z',
          },
          disconnectedAt: null,
          id: '6569c3a1f849913542fc55b1b8',
        },
      ],
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
