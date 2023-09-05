import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For the "toBeInTheDocument" matcher

import TcvoteFeatureHeader from './TcvoteFeatureHeader';

describe('TcvoteFeatureHeader', () => {
  it('renders the TcvoteFeatureHeader text', () => {
    const { getByText } = render(<TcvoteFeatureHeader />);

    const headerText = getByText('Vote on our next feature');

    expect(headerText).toBeInTheDocument();
  });
});
