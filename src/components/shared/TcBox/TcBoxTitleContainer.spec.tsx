import React from 'react';
import { render } from '@testing-library/react';
import TcBoxTitleContainer from './TcBoxTitleContainer';

describe('<TcBoxTitleContainer />', () => {
  // Test 1: Renders children correctly
  it('renders children correctly', () => {
    const { getByText } = render(
      <TcBoxTitleContainer children={<>Test Content</>} />
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  // Test 2: Applies custom classes
  it('applies custom classes correctly', () => {
    const { container } = render(
      <TcBoxTitleContainer
        children={<>Test Content</>}
        customClasses='test-class1 test-class2'
      />
    );

    const div = container.firstChild;
    expect(div).toHaveClass('test-class1');
    expect(div).toHaveClass('test-class2');
  });
});
