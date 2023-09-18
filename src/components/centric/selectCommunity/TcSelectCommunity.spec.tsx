import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TcCommunityListItems from './TcCommunityListItems';

describe('<TcCommunityListItems />', () => {
  const mockCommunities = [
    { avatar: 'path1', label: 'Community 1' },
    { avatar: 'path2', label: 'Community 2' },
    { avatar: 'path3', label: 'Community 3' },
  ];

  it('renders the community items correctly', () => {
    render(<TcCommunityListItems communities={mockCommunities} />);

    // Check that each community is rendered
    mockCommunities.forEach((community) => {
      expect(screen.getByText(community.label)).toBeInTheDocument();
    });
  });
});
