import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher
import TcButton from './TcButton';

describe('<TcButton />', () => {
  test('renders contained button with TcText wrapping', () => {
    render(<TcButton text='Sample Text' variant='contained' />);
    const buttonElement = screen.getByText('Sample Text');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders outlined button with TcText wrapping', () => {
    render(<TcButton text='Sample Text' variant='outlined' />);
    const buttonElement = screen.getByText('Sample Text');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders button without variant with direct text', () => {
    render(<TcButton text='Sample Text' />);
    const buttonElement = screen.getByText('Sample Text');
    expect(buttonElement).toBeInTheDocument();
  });
});
