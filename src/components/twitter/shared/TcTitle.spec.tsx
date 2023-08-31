import React from 'react';
import { render } from '@testing-library/react';
import TcTitle from './TcTitle';

describe('TcTitle component', () => {
  test('Render component correctly', () => {
    const defaultText = 'Title Test';
    //arrange
    const { getByText } = render(
      <TcTitle title={defaultText} variant={'h3'} />
    );
    //act

    //assert
    expect(getByText(defaultText)).toBeInTheDocument();
  });
});
