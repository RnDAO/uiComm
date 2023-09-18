import React, { ClassAttributes, ImgHTMLAttributes } from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher
import Index from './index';
import router from 'next/router';

// Mock the next/router push function
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  push: jest.fn(),
}));

describe('<Index />', () => {
  it('renders the Connect your Discord title', () => {
    const { getByText } = render(<Index />);
    expect(getByText('Connect your Discord')).toBeInTheDocument();
  });

  it('renders the button and checks if it redirects on click', () => {
    const { getByText } = render(<Index />);
    const button = getByText('Connect your Discord');
    fireEvent.click(button);
    expect(router.push).toHaveBeenCalledWith('/centric/tac');
  });

  it('renders the text about more login options', () => {
    const { getByText } = render(<Index />);
    expect(getByText('More log-in options comming soon.')).toBeInTheDocument();
  });
});
