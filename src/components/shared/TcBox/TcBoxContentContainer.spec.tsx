import React from 'react';
import { render } from '@testing-library/react';

import TcBoxContentContainer from './TcBoxContentContainer';

describe('<TcBoxContentContainer />', () => {
  // Test: Renders children correctly
  it('renders children correctly', () => {
    const { getByText } = render(
      <TcBoxContentContainer children={<>Test Content</>} />
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
