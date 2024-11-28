import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import TcvoteFeature from './TcvoteFeature';

// Mocking child components
jest.mock('./TcvoteFeatureHeader', () => {
  return () => <div>TcvoteFeatureHeader Mock</div>;
});

jest.mock('./TcvoteFeatureVotes/TcvoteFeatureVotes', () => {
  return ({ handleSelectedFeatures }: any) => (
    <button
      onClick={() => handleSelectedFeatures([false, false, false, false])}
    >
      Mock TcvoteFeatureVotes
    </button>
  );
});

describe('<TcvoteFeature />', () => {
  test('renders without crashing', () => {
    render(<TcvoteFeature />);
    expect(screen.getByText('TcvoteFeatureHeader Mock')).toBeInTheDocument();
    expect(screen.getByText('Mock TcvoteFeatureVotes')).toBeInTheDocument();
    expect(screen.getByText('Vote now')).toBeInTheDocument();
  });

  test('"Vote now" button is initially disabled', async () => {
    render(<TcvoteFeature />);
    const button = await waitFor(() =>
      screen.getByRole('button', { name: /Vote now/i })
    );
    expect(button).toBeDisabled();
  });
  test('"Vote now" button is enabled when features are selected', () => {
    render(<TcvoteFeature />);
    fireEvent.click(screen.getByText('Mock TcvoteFeatureVotes')); // Simulate selecting features
    expect(screen.getByText('Vote now')).not.toBeDisabled();
  });
});
