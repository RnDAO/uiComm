import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import TcvoteFeatureVotes from './TcvoteFeatureVotes';

const TcvoteFeatureVotesMockList = [
  {
    label:
      'Member Breakdown: see the accounts in each category to engage with them',
    value: 0,
  },
  {
    label: 'Tweet Scheduling: create tweets directly from the dashboard ',
    value: 1,
  },
  {
    label:
      'Cross Platform Integration: see how many active twitter followers are also active in your discord',
    value: 2,
  },
  {
    label:
      'Targeting: Discover new twitter profiles similar to your most active followers',
    value: 3,
  },
];

describe('<TcvoteFeatureVotes />', () => {
  test('renders the list items correctly', () => {
    for (const item of TcvoteFeatureVotesMockList) {
      const mockFn = jest.fn();
      render(<TcvoteFeatureVotes handleSelectedFeatures={mockFn} />);
      const textElement = screen.queryByText(item.label);
      if (!textElement) {
        console.error(`Failed to find: ${item.label}`);
      }
      cleanup();
    }
  });

  test('updates the state correctly when a checkbox is clicked', () => {
    const mockFn = jest.fn();
    render(<TcvoteFeatureVotes handleSelectedFeatures={mockFn} />);

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);

    expect(mockFn).toHaveBeenCalledWith([true, false, false, false]);
  });
});
