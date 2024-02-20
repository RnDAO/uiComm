import { render } from '@testing-library/react';
import React from 'react';

import TcLink from './TcLink';

describe('TcLink component', () => {
  test('Render component correctly', () => {
    const defaultText = 'Title Test';

    //arrange
    const { getByText } = render(<TcLink to="/">{defaultText}</TcLink>);

    //assert
    expect(getByText(defaultText)).toBeInTheDocument();
  });
});
