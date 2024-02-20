import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import TcvoteFeatureVotesItems from './TcvoteFeatureVotesItems';

describe('<TcvoteFeatureVotesItems />', () => {
  test('renders correctly', () => {
    render(
      <TcvoteFeatureVotesItems
        label='Test'
        color='primary'
        isChecked={false}
        handleToggleCheckbox={jest.fn()}
      />
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('renders checked checkbox based on isChecked prop', () => {
    const { rerender } = render(
      <TcvoteFeatureVotesItems
        label='Test'
        color='primary'
        isChecked={false}
        handleToggleCheckbox={jest.fn()}
      />
    );
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(
      <TcvoteFeatureVotesItems
        label='Test'
        color='primary'
        isChecked={true}
        handleToggleCheckbox={jest.fn()}
      />
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('calls handleToggleCheckbox when checkbox is clicked', () => {
    const mockFn = jest.fn();
    render(
      <TcvoteFeatureVotesItems
        label='Test'
        color='primary'
        isChecked={false}
        handleToggleCheckbox={mockFn}
      />
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockFn).toHaveBeenCalled();
  });
});
