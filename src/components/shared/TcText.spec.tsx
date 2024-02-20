import { render } from '@testing-library/react';
import React from 'react';

import TcTitle from './TcText';

describe('TcTitle component', () => {
  test('Render component correctly', () => {
    const defaultText = 'Title Test';
    //arrange
    const { getByText } = render(<TcTitle text={defaultText} variant='h3' />);
    //act

    //assert
    expect(getByText(defaultText)).toBeInTheDocument();
  });
});
